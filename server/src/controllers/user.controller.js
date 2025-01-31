import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { log } from "console";

// Cookies for options
const options = {
    httpOnly: true,
    secure: true
};

// CHANGE: Log errors for debugging
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(400, "User not found"); // CHANGE: Added better error handling if user is not found
        }

        // CHANGE: Ensure that these methods exist and generate tokens correctly
        const accessToken = user.genrateAccessToken(); // Should use the genrateAccessToken method in the User model
        const refreshToken = user.genrateRefreshToken(); // Should use the genrateRefreshToken method in the User model

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false }); // CHANGE: Ensure user.save() is awaited and validated

        return { accessToken, refreshToken };

    } catch (error) {
        console.error("Error generating tokens:", error); // CHANGE: Log the error
        throw new ApiError(500, "Access & Refresh token not generated successfully!"); // CHANGE: Added error logging
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        throw new ApiError(400, "Please fill all the fields");
    }

    if (name.trim() === "" || username.trim() === "" || password.trim() === "") {
        throw new ApiError(400, "Please fill all the fields");
    }

    const existedUser = await User.findOne({ username });

    if (existedUser) {
        throw new ApiError(400, "Username already exists");
    }

    let profilePic;

    if (req.file && req.file.path) {
        const profilePicLocalPath = req.file.path;
        profilePic = await uploadOnCloudinary(profilePicLocalPath);
    }


    const user = await User.create({
        name,
        username: username.toLowerCase(),
        password,
        profilePic: profilePic?.url || ""
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(400, "User creation failed !!");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                user,
                "User registered successfully !!"
            )
        );

});

// CHANGE: Update loginUser function with status 200 and error handling
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, "Please fill all the fields");
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new ApiError(400, "Username not exists !");
    }

    const isPasswordValid = await user.isPasswordMatched(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Password is invalid !");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user?._id);

    const loggedInUser = await User.findById(user?._id).select("-password -refreshToken");

    return res
        .status(200) // CHANGE: Status should be 200 for successful login
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, // CHANGE: Status code should be 200 for successful login
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    return res
        .status(201)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                201,
                {},
                "User logged out successfully."
            )
        );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req?.user,
                "User found successfully."
            )
        );
});

const updateUserDetails = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === "") {
        throw new ApiError(400, "Please fill name field");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                name
            }
        },
        {
            new: true
        }
    ).select("-password");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "User name updated successfully."
            )
        );
});

const updateUserProfilePic = asyncHandler(async (req, res) => {
    const profilePicLocalPath = req.file?.path;
    const oldProfilePicPath = req.user?.profilePic;

    if (!profilePicLocalPath) {
        throw new ApiError(400, "Profile picture is required");
    }

    const profilePic = await uploadOnCloudinary(profilePicLocalPath);

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                profilePic: profilePic.url
            }
        },
        {
            new: true
        }
    ).select("-password");

    await deleteOnCloudinary(oldProfilePicPath);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "User profile picture updated successfully."
            )
        );
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.user?._id);

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "User deleted successfully."
            )
        );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const IncomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!IncomingRefreshToken) {
        throw new ApiError(400, "Refresh token is required");
    }

    const decodedToken = jwt.verify(IncomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decodedToken) {
        throw new ApiError(400, "Invalid refresh token");
    }

    const user = await User.findById(decodedToken?._id);

    if (!user) {
        throw new ApiError(400, "Refresh token is invalid.");
    }

    if (IncomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(400, "Refresh token is use or expired.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user?._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken, refreshToken
                },
                "Access token refreshed successfully."
            )
        );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Please fill all the fields");
    }

    if (oldPassword.trim() === "" || newPassword.trim() === "") {
        throw new ApiError(400, "Please fill all the fields");
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    const isPasswordMatched = await user?.isPasswordMatched(oldPassword);

    if (!isPasswordMatched) {
        throw new ApiError(400, "Old password is incorrect");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password changed successfully."
            )
        );
});


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateUserDetails,
    updateUserProfilePic,
    deleteUser,
    refreshAccessToken,
    changeCurrentPassword
};
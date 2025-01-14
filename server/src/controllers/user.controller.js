import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";

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

    const profilePicLocalPath = req.file?.path;

    if (!profilePicLocalPath) {
        throw new ApiError(400, "Profile picture is required");
    }

    const profilePic = await uploadOnCloudinary(profilePicLocalPath);

    const user = await User.create({
        name,
        username: username.toLowerCase(),
        password,
        profilePic: profilePic.url
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
                "User created successfully !!"
            )
        );

});

export {
    registerUser
};
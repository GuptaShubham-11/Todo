import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateUserDetails,
    updateUserProfilePic,
    deleteUser,
    refreshAccessToken,
    changeCurrentPassword

} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
    .route("/register")
    .post(
        upload.single("profilePic"),
        registerUser
    );

router
    .route("/login")
    .post(
        loginUser
    );

// SECURED ROUTES
router
    .route("/logout")
    .post(
        verifyJWT,
        logoutUser
    );

router
    .route("/current-user")
    .get(
        verifyJWT,
        getCurrentUser
    );

router
    .route("/update-user-details")
    .put(
        verifyJWT,
        updateUserDetails
    );

router
    .route("/update-user-profile-pic")
    .put(
        verifyJWT,
        upload.single("profilePic"),
        updateUserProfilePic
    );

router
    .route("/refresh-access-token")
    .get(
        verifyJWT,
        refreshAccessToken
    );

router
    .route("/change-current-password")
    .put(
        verifyJWT,
        changeCurrentPassword
    );

router
    .route("/delete-user")
    .delete(
        verifyJWT,
        deleteUser
    );


export default router;
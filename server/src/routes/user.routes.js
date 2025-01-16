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
        upload.single("profilePic"), // Handles profile picture upload
        registerUser
    );

router
    .route("/login")
    .post(
        loginUser
    );

// SECURED ROUTES
router.use(verifyJWT); // CHANGED HERE: Added middleware to avoid repeating `verifyJWT`

router
    .route("/logout")
    .post(logoutUser);

router
    .route("/current-user")
    .get(getCurrentUser);

router
    .route("/update-user-details")
    .put(updateUserDetails);

router
    .route("/update-user-profile-pic")
    .put(
        upload.single("profilePic"),
        updateUserProfilePic
    );

router
    .route("/refresh-access-token")
    .get(refreshAccessToken);

router
    .route("/change-current-password")
    .put(changeCurrentPassword);

router
    .route("/delete-user")
    .delete(deleteUser);

export default router;
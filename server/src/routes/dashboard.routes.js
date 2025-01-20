import { Router } from "express";
import {
    getCompletedTodosCount,
    getRecentActivity,
    getTodosCount
} from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// SECURE ROUTES
router.use(verifyJWT);

router
    .route("/completed-todos-count")
    .get(getCompletedTodosCount);

router
    .route("/todos-count")
    .get(getTodosCount);

router
    .route("/recent-activity")
    .get(getRecentActivity);

export default router;

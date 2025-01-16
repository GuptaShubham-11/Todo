import { Router } from "express";
import {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodoById,
    getAllTodos
} from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// SECURE ROUTES
router.use(verifyJWT);

router
    .route("/todos")
    .post(createTodo)
    .get(getAllTodos);

router
    .route("/todos/:id")
    .put(updateTodo)
    .delete(deleteTodo);

router
    .route("/todos/:id")
    .get(getTodoById);

export default router;
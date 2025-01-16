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
    .route("/create-todo")
    .post(createTodo);

router
    .route("/get-all-todos")
    .get(getAllTodos);

router
    .route("/update-todo/:id")
    .put(updateTodo);

router
    .route("/delete-todo/:id")
    .delete(deleteTodo);

router
    .route("/get-todo/:id")
    .get(getTodoById);

export default router;
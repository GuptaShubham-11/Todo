import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Parse the CORS_ORIGIN environment variable into an array
const corsOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];

app.use(cors(
    {
        origin: corsOrigins,
        credentials: true
    }
));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users", userRoutes);

import todoRoutes from "./routes/todo.routes.js";
app.use("/api/v1/todos", todoRoutes);

import dashboardRoutes from "./routes/dashboard.routes.js";
app.use("/api/v1/dashboard", dashboardRoutes);

// Global error handler for unhandled errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ message }); // Send error in JSON format
});

export default app;
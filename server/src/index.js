import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("UNEXPECTED ERROR IN CONNECTDB !!", error);
            throw error;
        });
        app.listen(process.env.PORT || 3000, () => {
            console.log(`http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("ERROR IN CONNECTDB FROM INDEXJS !!", error);
        process.exit(1);
    });
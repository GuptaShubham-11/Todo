import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});

connectDB()
    .then(() => {
        app.on("error", (error) => {
            throw error;
        });
        app.get("/server", (req, res) => {
            return res.status(200).send("Server is running");
        });
        app.get("/", (req, res) => {
            return res.status(200).send("Home page");
        });
        app.listen(process.env.PORT || 3000, () => {
            console.log(`http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        process.exit(1);
    });
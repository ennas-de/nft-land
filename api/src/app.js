import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { globalActions } from "./global/actions.global.js";

// initialize app
const app = express();
dotenv.config();

// set up app level midlewares
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// set up gloabl actions 
globalActions();

// set up routes
app.use("/api", router);

// 404 page handler
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page not found!",
    });
};
app.use("*", notFoundHandler)

export default app;
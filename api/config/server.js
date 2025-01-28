import dotenv from "dotenv";
import app from "../src/app.js";
import connectDB from "./db.js";

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    await connectDB();
    console.log(
        `Server is running in ${process.env.DEV_MODE ? "Development" : "Production"} Mode, on Port: ${port}`
    );
})
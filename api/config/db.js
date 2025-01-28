import dotenv from "dotenv";
import mongoose from "mongoose";
// import colors from "colors";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI_DEVELOPMENT || "");

        let DBName = process.env.MONGO_URI_DEVELOPMENT;
        DBName = DBName?.split('/')[3];

        console.log(
            `Database connection to DB "${DBName}" through ${mongoose.connection.host} is successful!`
        );
    } catch (error) {
        console.error({error});
    }
}

export default connectDB;

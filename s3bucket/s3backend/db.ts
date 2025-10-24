import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectToDB(){
    console.log(process.env.MONGO_URI);
    
    try {
        await mongoose.connect(process.env.MONGO_URI!)
            console.log("eww");

    } catch (error) {
        console.log(error);
        
    }
}
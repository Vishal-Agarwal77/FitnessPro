import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError.js';

dotenv.config({
    path: './.env'
})

const connectToDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);
        // const database = await connectionInstance.db(`${process.env.DB_NAME}`)
        // const collection = await database.collection('users');
        console.log("Successfully connected to database")
    } catch (error) {
        console.log(new ApiError(500, "Connection to database is failed"));
        console.log(error);
    }
}

export { connectToDb }
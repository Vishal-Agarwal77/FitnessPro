import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({
    path:'./.env'
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        //If there is no file
        if (!localFilePath) return;

        //upload on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath)

        //delete the file from local
        // fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {

        // fs.unlinkSync(localFilePath);
        console.log(error);
    }
}

export {uploadOnCloudinary}
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();




// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Upload an image
const uploadOnCloudinary = async(localFilePath) => {
    try {
        
        if (!localFilePath){
             return null
            };

        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log(response)

        // succesfull prompt
        // console.log("File has been successfully uploaded on cloudinary.......", response.url)
        fs.unlinkSync(localFilePath)
        return response
    }catch (error) {
        console.log("cloudinary error: ", error)
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file if the upload is failed
        return null;
    }
}

export {uploadOnCloudinary}


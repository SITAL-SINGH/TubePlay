import {Router} from 'express';
import { registerUser } from '../controllers/user.controller.js';
import {upload} from "../middlewares/multer.middleware.js"


const router = Router();


// router.route("/register").post(registerUser)  

// injecting our multer.middleware.js middle ware to handle the file like coverimage and avatar image.
router.route("/register").post(
    upload.fields(
        {
            name: "avatar",
            maxCount: 1,
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ),      // accept array so that we can access or handle multiple files
    registerUser)  


export default router;
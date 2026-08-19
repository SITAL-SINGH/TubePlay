import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();
app.use(cors(
    {
        origin: process.env.CROSS_ORIGIN,
        credentials: true
    }
));

app.use(express.json({limit: "15kb"}))
app.use(express.urlencoded({extended: true, limit: "15kb"}))
app.use(express.static("public"))
app.use(cookieParser())

export {app}




// routes import 

import userRouter from "./routes/user.routes.js" 


// routes Declaration
//app.use("/users", userRouter) // url will be like: http://localhost8000/users/register

//standard practice for making the apis
app.use("/api/v1/users", userRouter) //url will be like: http://localhost8000/api/v1/users/register. here, v1 means version 1.
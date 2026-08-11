
import express from "express";
import connectDB from "./db/index.js"
import dotenv from "dotenv";
import { app } from "./app.js";

// configuring dotenv
dotenv.config()
// function connectDB(){}
// connectDB()


// initializing our app
// const app = express()

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port ${process.env.PORT}`)
    })
})
.catch((error)=> {
    console.log(`MongoDB Connection failed ${error}`);
})







// more professional approach-> use IIFE with asysc and arrow function

/* This is one approach to connect to the database but we will take anoter one
( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Error: ", error);
            throw error
        });
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port: ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
} )()
*/

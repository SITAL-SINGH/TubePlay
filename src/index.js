
import express from "express";
import connectDB from "./db/index.js"
import dotenv from "dotenv";

// configuring dotenv
dotenv.config()
// function connectDB(){}
// connectDB()


// initializing our app
// const app = express()

connectDB();







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

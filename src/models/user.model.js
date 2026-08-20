import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true, // make the field searchable in optmized way
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // we will use cloudanary url
        required: true,
        
    },
    avatar: {
        type: String,     // we will use cloudanary url    
    },
    watchHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        required: [true, "password is required"],
        trim: true
    },
    refreshToken: {
        type: String
    }
}, 
{timestamps: true});

// we use prehook middleware such that if use save password we can encrypt it before saving
userSchema.pre("save", async function(next) {
    if (!this.isModified("password"))  return next();  // if password is not modified we will not encrypt the pass so not to chage the pass everytime this hook is triggered
    this.password = await bcrypt.hash(this.password) // encrypt the password
})
userSchema.methods.isPasswordCorrect =  async function(password) {
    return await bcrypt.compare(password, this.password)
}

// creating jwt access and refresh token for authentication.
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    // get userdetails from the frontend 
    // validation - nonempty
    //check if it already exists
    //check for the images, check for avatar
    // upload them to cloudinary, avatar check
    // create user object (needed when storing them in mongodb) - create entity in db
    // remove the pass and refresh field from response
    // check for user creation
    // return res

    // to get data from form or json
    const { fullname, email, username, password } = req.body
    console.log("email: ", email)


    // validation
    // if (fullname == ""){
    //     throw new ApiError(400, "Full name required") // have to do this for every single field
    // }

    //new way
    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All field are required...")
    }

    // check if user already exists
    const userExisted = User.findOne({
        $or: [{ username }, { email }]
    })
    console.log(userExisted)

    if (userExisted) {
        throw new ApiError(409, `User with email: ${email} or username: ${username} already existed`);

    }


    console.log(req.files)
    // for files
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required..")
    }

    // upload on cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath) // it will take time to upload
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar is required")
    }

    // database entry
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // finding the user by id and removing the password and refresh token field

    const createdUser = await User.findById(user._id).select(" -password -refreshToken")

    if (!createdUser){
        throw new ApiError(500, "something went wrong while registering the user")

    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registerd Succesfully")
    )



})

export { registerUser }
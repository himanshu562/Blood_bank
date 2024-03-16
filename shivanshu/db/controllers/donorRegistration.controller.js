import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {Donor} from '../models/donor.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from "jsonwebtoken"


const generateAccessAndRefreshToken = async (userId) =>{
    try {
        const user = await Donor.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
        
    }

}


const registerUser = asyncHandler(async (req, res) => {
    // get user detail from frontend
    // check validation, not empty
    // check if user already exists: username , email
    // check for image, then check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in database
    // remove password and refresh token fields from response
    // check for user cretion
    // return res


    // get user detail from frontend

    console.log("aa gaya")
    try {
    

    const { fullName, email, username, password } = req.body
    console.log("email", email);

    // check validation, not empty

    if(
        [fullName, email, username, password].some((field) =>
        field?.trim()==="")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // check if user already exists: username , email

    const existedUser = await Donor.findOne({
        $or: [{username}, {email}]
    })

    if ( existedUser ){
        throw new ApiError(409, "User with username or email already exists")
    }

    
    const user = await Donor?.create({
        fullName,
        email,
        password,
        username: username.toLowerCase()

    })

    // check for user cretion

    const createdUser = await Donor.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // return res

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )} catch (error) {
    console.log(error.message,error.status,error.statusText)
    }

})

const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    // find the user
    // password check
    // access and refresh token
    // send cookie

    const {email, username, password} = req.body

    if (!(username || email)){
        throw new ApiError(400, "Username or email is required");
    }

    const user = await Donor.findOne({
        $or: [{username}, {email}]
    })

    if (!user){
        throw new ApiError(404, "User not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await Donor.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )

})

const logoutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },{
            new: true
        })
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

    if (incomingRefreshToken){
        throw new ApiError("401", "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await Donor.findById(decodedToken?._id)
    
        if (!user){
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token") 
    }

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body
    
    const user = await Donor.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "invalid password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"))
})

const UpdateAccountDetails = asyncHandler(async (req, res) => {
    const {fullName ,email} = req.body

    if(!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await Donor.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        }, {new: true}
    ).select("-password")

    return res
    .res(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
})


export {registerUser,
        loginUser,
        logoutUser, 
        refreshAccessToken,
        changeCurrentPassword,
        getCurrentUser,
        UpdateAccountDetails,
        
}
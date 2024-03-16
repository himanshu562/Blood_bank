import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {BloodBank} from '../models/bloodBank.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from "jsonwebtoken"


const generateAccessAndRefreshToken = async (userId) =>{
    try {
        const user = await BloodBank.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
        
    }

}


const registerBloodBank = asyncHandler(async (req, res) => {
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
    

    const { bank_name, address, contact, email, password } = req.body
    console.log("email", email);

    // check validation, not empty

    if(
        [bank_name, email, password].some((field) =>
        field?.trim()==="")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // check if user already exists: username , email

    const existedUser = await BloodBank.findOne({
        email
    })

    if ( existedUser ){
        throw new ApiError(409, "User with username or email already exists")
    }

    
    const user = await BloodBank?.create({
        bank_name, 
        address, 
        contact, 
        email, 
        password

    })

    // check for user cretion

    const createdUser = await BloodBank.findById(user._id).select(
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

const loginBloodBank = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    // find the user
    // password check
    // access and refresh token
    // send cookie

    const {email, password} = req.body

    if (!(email)){
        throw new ApiError(400, "Username or email is required");
    }

    const user = await BloodBank.findOne({
        email
    })

    if (!user){
        throw new ApiError(404, "User not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await BloodBank.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    console.log("logg in successfully")
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

const logoutBloodBank = asyncHandler(async (req, res) => {
    BloodBank.findByIdAndUpdate(req.user._id,
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

const refreshAccessTokenBB = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

    if (incomingRefreshToken){
        throw new ApiError("401", "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await BloodBank.findById(decodedToken?._id)
    
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

const changeCurrentPasswordBB = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body
    
    const user = await BloodBank.findById(req.user?._id)
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

const getCurrentUserBB = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"))
})




export {registerBloodBank,
        loginBloodBank,
        logoutBloodBank, 
        refreshAccessTokenBB,
        changeCurrentPasswordBB,
        getCurrentUserBB
        
}
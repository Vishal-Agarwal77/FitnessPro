import { User } from "../models/user.models.js";
import { VerificationUser } from "../models/verification.models.js";
import { Workout } from "../models/workout.models.js";
import { WorkoutPlan } from "../models/workoutplan.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { generatetOtp, mailTransport } from "../utils/Otpgenerator.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

let newUser

const registerUser = async (req, res) => {
    try {
        //Getting User Data
        const { avatar, username, fullname, email, password } = req.body;
        // console.log(req.body)

        //validation Not empty
        if (!(username && email && password)) {
            throw new ApiError(400, "* Fields are compulsory")
        }

        //check if User already exist with username or email
        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existedUser) {
            throw new ApiError(409, "User with this email or username already exist ")
        }

        //Check for avatar image
        const avatarLocalPath = req.files?.avatar[0]?.path;
        // console.log(avatarLocalPath);

        //Upload avatar image to cloudinary
        const avatarfile = await uploadOnCloudinary(avatarLocalPath);
        // console.log(avatarfile)

        //Create User entry in database
        const user = await User.create({
            avatar: avatarfile?.url,
            fullname,
            username,
            email,
            password,
            verified: false
        })

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        newUser = createdUser._id;
        //Email verification

        const otp = generatetOtp();
        const verificationToken = new VerificationUser({
            owner: createdUser._id,
            token: otp
        })

        await verificationToken.save()
        await user.save();

        //send the verification mail

        // mailTransport
        const verify = await
            mailTransport.sendMail({
                from: 'emailverification@email.com',
                to: user.email,
                subject: 'Verify your email account',
                html: `<h1>${otp}</h1>`
            })

        //return Response

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User Created Successfully")
        )
    } catch (error) {
        console.log(error)
    }
}

const VerifyUser = async (req, res) => {
    try {
        //Getting the otp from user
        const { otp } = req.body;

        //Getting the Verification model from verification database
        const pendingUser = await VerificationUser.findOne({ owner: `${newUser._id}` });

        //Getting the User model from the User database
        const user = await User.findOne({ _id: `${newUser._id}` })

        //Check the otp
        const isVerified = await bcrypt.compare(otp, pendingUser.token)

        // console.log(user)
        // console.log(pendingUser)
        //If otp is correct change the user's verified to true
        if (isVerified) {
            user.verified = true
            await user.save();
        }

        //return the response
        return res.status(200).json(
            new ApiResponse(200, isVerified, "User Verified Successfully")
        )
    } catch (error) {
        console.log(error);
    }
}

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        const loggedInUser = user
        return { accessToken, refreshToken, loggedInUser }
    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const loginUser = async (req, res) => {
    try {
        //Getting username and password from user
        const { email, password } = req.body;

        if (!(email || password)) {
            throw new ApiError(400, "username or password is required");
        }

        //Find the user
        const existingUser = await User.findOne({ email: `${email}` })

        if (!existingUser) {
            return res
                .status(210)
                .json(
                    new ApiResponse(
                        210,
                        {
                        },
                        'User Not Found'
                    )
                )
        }

        //Check if the email is Verified

        if (!existingUser?.verified) {
            throw new ApiError(400, "Email is not Verified")
        }

        //Check the password

        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid User Credentials")
        }

        //Generate Access Token and Refresh Token

        const { accessToken, refreshToken, loggedInUser } = await generateAccessAndRefreshTokens(existingUser._id)

        // //Cookie

        // const cookieOptions = {
        //     maxAge: 3600000,
        //     httpOnly:false,
        //     sameSite:'none',
        //     secure:false
        // };

        //return response
        return res
            .status(200)
            .cookie("AccessToken", accessToken)
            .cookie("RefreshToken", refreshToken)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    'User logged in successfully'
                )
            )
    } catch (error) {
        console.log(error)
    }
}

const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find()
    return res
        .status(200)
        .json(workouts)
}

const createWorkout = async (req, response) => {
    try {
        //Get the details
        const { accessToken, plan, action } = req.body;

        // if(!accessToken){
        //     accesstoken = req.cookies["AccessToken"]
        // }

        // console.log("Access Token = " + accesstoken)
        const payload = jwt.verify(accessToken, 'sample123')
        // console.log(payload)

        const userId = payload._id

        //Check if userId is present or not
        if (!userId) {
            throw new ApiError(400, "User is Required");
        }

        //Create WorkoutPlan entry in database
        let existedUser
        existedUser = await WorkoutPlan.findOne({ User: `${userId}` })

        let date = new Date()
        let d = '' + date.getDate();
        let m = '' + date.getMonth();
        let y = '' + date.getFullYear();
        let res = ((d.length < 2) ? "0" + d : d) + ((m.length < 2) ? '0' + m : m) + ((y.length < 2) ? '0' + y : y)
        if (action === "ADD") {
            if (!existedUser) {
                existedUser = await WorkoutPlan.create({
                    User: userId,
                    Plan: []
                })
            }
            if (existedUser.Plan) {
                let found = false
                for (let el of existedUser.Plan) {
                    if (el.date === res) {
                        found = true
                    }
                }
                if (!found) {
                    existedUser.Plan.push({
                        date: res,
                        workout: []
                    })
                }
            }
            let size = existedUser.Plan.length - 1
            existedUser.Plan[size].workout.push(plan);
            existedUser.save()
        }
        else {
            let size = existedUser.Plan.length - 1
            let plans = existedUser.Plan[size].workout.filter((item) => {
                if (item.Name === plan.Name) {
                    return false
                }
                return true
            })
            existedUser.Plan[size].workout = plans
            existedUser.save()
        }

        //return response
        return response
            .status(201)
            .json(
                new ApiResponse(200, existedUser, "Workout Plan Created Successfully")
            )
    } catch (error) {
        console.log(error)
    }
}

const currentWorkout = async (req, response) => {
    try {
        //Get the Details
        const { accessToken, action, planName } = req.body

        // const accesstoken = req.cookies["AccessToken"]

        // console.log("Access Token = " + accesstoken)
        const payload = jwt.verify(accessToken, 'sample123')
        // console.log(payload)

        const userId = payload._id
        //Check if userId is present or not
        if (!userId) {
            throw new ApiError(400, "User is Required");
        }

        //Get the object from workoutplans database
        let existedUser = await WorkoutPlan.findOne({ User: `${userId}` })

        if (!existedUser) {
            // throw new ApiError(400, "No Plan exist")
            return res
                .status(400)
                .json(
                    new ApiResponse(400, "", "No Plans Exist")
                )
        }

        let size = existedUser.Plan.length - 1
        let plans

        let date = new Date()
        let d = '' + date.getDate();
        let m = '' + date.getMonth();
        let y = '' + date.getFullYear();
        let res = ((d.length < 2) ? "0" + d : d) + ((m.length < 2) ? '0' + m : m) + ((y.length < 2) ? '0' + y : y)
        if (action === 'Change') {
            let found = false
            existedUser.Plan.map((item) => {
                if (item.date === res) {
                    for (let el of item.workout) {
                        if (el.Name === planName) {
                            el.Status = true
                        }
                    }
                }
            })
            // plans = existedUser.Plan[size].workout.map((item) => {
            //     if (planName === item.Name  ) {
            //         item.Status = true
            //     }
            //     return item
            // })
            // existedUser.Plan[size].workout = plans
            existedUser.save()
        }
        else {
            plans = existedUser.Plan.filter((item) => {
                if (item.date === res) {
                    return true
                }
            })
        }
        //return response
        return response
            .status(200)
            .json(
                new ApiResponse(200, plans[0]?.workout, "Workout fetched successfully")
            )
    } catch (error) {
        console.log(error)
    }
}

const completedWorkout = async (req, res) => {
    try {
        //Get the details
        const { accessToken, plan } = req.body

        // const accesstoken = req.cookies["AccessToken"]

        // console.log("Access Token = " + accesstoken)
        const payload = jwt.verify(accessToken, 'sample123')
        // console.log(payload)

        const userId = payload._id

        //Check if userId is present or not
        if (!userId) {
            throw new ApiError(400, "User is Required");
        }

        //Get the object from workoutplans database
        let existedUser = await WorkoutPlan.findOne({ User: `${userId}` })

        if (!existedUser) {
            throw new ApiError(400, "No Plan exist")
        }

        let plans
        // console.log(existedUser);
        let size = existedUser.Plan.length - 1
        plans = existedUser.Plan[size].workout.map((item) => {
            if (plan.Name === item.Name) {
                item.Status = true
                item.Intensity = plan.Intensity
                item.Time_taken = plan.Time_taken
            }
            return item
        })
        // console.log(plans);
        existedUser.Plan[size].workout = plans
        existedUser.save()

        //Return the response
        return res
            .status(200)
            .json(
                new ApiResponse(200, plans, "Workout Done Successfully")
            )
    } catch (error) {
        console.log(error)
    }
}

const getUserProfile = async (req, res) => {
    try {
        //Get the Details
        const { accessToken } = req.body

        if (!accessToken) {
            throw new ApiError(400, "User is Required");
        }

        const payload = jwt.verify(accessToken, 'sample123')

        // console.log(payload)

        const user = await User.findOne({ _id: `${payload._id}` })

        //Return the Response

        return res
            .status(200)
            .json(
                new ApiResponse(200, user, "User Profile Fetched Successfully")
            )

    } catch (error) {
        console.log(error)
    }
}

const getRecord = async (req, res) => {
    try {
        //Get the Details
        const { accessToken } = req.body

        // const accesstoken = req.cookies["AccessToken"]

        // console.log("Access Token = " + accesstoken)
        const payload = jwt.verify(accessToken, 'sample123')
        // console.log(payload)

        const userId = payload._id
        //Check if userId is present or not

        if (!userId) {
            throw new ApiError(400, "User is Required");
        }

        let obj = {
            Date: [],
            Calories: [],
            Minutes: [],
            Workout_Count: []
        }
        //Find the user
        let existedUser = await WorkoutPlan.findOne({ User: `${userId}` })

        if (!existedUser) {
            for (let i = 1; i <= 7; i++) {
                let date = new Date(Date.now() - (24 * 60 * 60 * 1000 * i))
                let d = '' + date.getDate();
                let m = '' + date.getMonth();
                let y = '' + date.getFullYear();
                let res = ((d.length < 2) ? "0" + d : d) + ((m.length < 2) ? '0' + m : m) + ((y.length < 2) ? '0' + y : y)
                obj.Calories.push(0)
                obj.Minutes.push(0)
                obj.Workout_Count.push(0)
                obj.Date.push(res.slice(0, 2) + "-" + res.slice(2, 4) + "-" + res.slice(4, res.length))
            }
            return res
                .status(200)
                .json(
                    new ApiResponse(200, obj, "Records fetched Successfully")
                )
        }

        //Generate the Past Records
        // console.log(existedUser);

        for (let i = 1; i <= 7; i++) {
            let date = new Date(Date.now() - (24 * 60 * 60 * 1000 * i))
            let d = '' + date.getDate();
            let m = '' + date.getMonth();
            let y = '' + date.getFullYear();
            let res = ((d.length < 2) ? "0" + d : d) + ((m.length < 2) ? '0' + m : m) + ((y.length < 2) ? '0' + y : y)
            let found = false
            for (let j of existedUser.Plan) {
                if (j.date === res) {
                    found = true
                    let time = 0, cal = 0, cnt = 0
                    for (let el of j.workout) {
                        time += el.Time_taken
                        cnt += (el.Status ? 1 : 0)
                        cal += el.Time_taken * (el.Intensity * 3.5 * 45) / 200
                    }
                    obj.Calories.push(cal)
                    obj.Minutes.push(time)
                    obj.Workout_Count.push(cnt)
                    obj.Date.push(res.slice(0, 2) + "-" + res.slice(2, 4) + "-" + res.slice(4, res.length))
                }
            }
            if (!found) {
                obj.Calories.push(0)
                obj.Minutes.push(0)
                obj.Workout_Count.push(0)
                obj.Date.push(res.slice(0, 2) + "-" + res.slice(2, 4) + "-" + res.slice(4, res.length))
            }
        }


        return res
            .status(200)
            .json(
                new ApiResponse(200, obj, "Past Records fetched Successfully")
            )
    } catch (error) {
        console.log(error)
    }
}
export { registerUser, VerifyUser, loginUser, getAllWorkouts, createWorkout, currentWorkout, completedWorkout, getUserProfile, getRecord };
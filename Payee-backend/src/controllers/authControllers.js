import { validationResult } from "express-validator"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (user)=>{
    const payload = {
        id:user._id,
        firstname:user.firstName,
        email:user.email,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"7d"})
    return token;
}

export const registerUser = async (req, res) => {
    try {
            const { firstName, lastName, email, password } = req.body;
    const errors = validationResult(req) 

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const existingUser = await User.findOne({email});

    if (existingUser) {
        return res.status(409).json({message:"Email ALready in Use"})
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password:hashedPassword,
    })
    await newUser.save();
    
    return res.status(201).json({
        message:"User Created Successsfully",
        user:{
            id:newUser._id,
            firstname:newUser.firstName,
            email:newUser.email
        },
        token:createToken(newUser)
    })
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }

}

export const loginUser = (req, res) => {
    
}
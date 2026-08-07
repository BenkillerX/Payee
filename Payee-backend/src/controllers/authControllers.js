import { validationResult } from "express-validator"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (user)=>{
    const payload = {
        id:user._id,
        username:user.username,
        email:user.email,
        role:user.role
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"7d"})
    return token;
}

export const registerUser = async (req, res) => {
    try {
            const { username, email, password } = req.body;
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
       username,
        email,
        password:hashedPassword,
    })
    await newUser.save();
    
    return res.status(201).json({
        message:"User Created Successsfully",
        user:{
            id:newUser._id,
            username:newUser.username,
            email:newUser.email
        },
        token:createToken(newUser)
    })
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }

}

export const loginUser = async (req, res) => {
    try {
         const {username, password} = req.body;
        const errors = validationResult(req)

    const existingUser = await User.findOne({username})
    if (!existingUser) {
        return res.status(400).json({message:"User Not Found Create Account First"})
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        return res.status(400).json({message:"Invalid Password"})
    }
    res.status(201).json({
        message:"Login IN Successfully",
        token:createToken(existingUser)
    })
    } catch (error) {
        return res.status(500).json({message:"Server Error"})
    }
   


}
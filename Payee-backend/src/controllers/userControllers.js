import { validationResult } from "express-validator";
import User from "../models/User.js"

export const getCurrentUser = async (req, res)=>{
    try {
        const currentUser = await User.findOne({
            username: req.user.username
        });

        if (!currentUser) {
            return res.status(404).json({message:"User Not Found"})
        }
        return res.status(200).json({
            message:{currentUser}
        })
    } catch (error) {
        return res.status(500).json({message:"Server Error"})
    }
} 

export const updateProfile = async (req, res)=>{
    try {
        const {updatedData} = req.body;
        const {id} = req.user._id
        const errors = validationResult(req)    

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors:errors.array()
            })
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updatedData,
            {mew:true, runValidators:true}
        );

        if (!updatedUser) {
            return res.status(404).json({
                message:"User Not Found"
            })
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({message:"server error"
        })
    }
}
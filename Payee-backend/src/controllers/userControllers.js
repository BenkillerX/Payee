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

export const updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const id = req.user.id;

        const { username, email } = req.body;

        const updatedData = {};

        if (username !== undefined) {
            updatedData.username = username;
        }

        if (email !== undefined) {
            updatedData.email = email;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updatedData,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        return res.status(200).json({
            message: "Profile Updated Successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};
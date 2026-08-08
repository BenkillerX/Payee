import { validationResult } from "express-validator";
import User from "../models/User.js"
import bcrypt from "bcrypt"

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
     console.log("3. updateProfile reached");
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

export const changePassword = async (req, res)=>{
    try {
        const {currentPassword, newPassword} = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const storedUser = await User.findById(req.user.id)
        
        if (!storedUser) {
            return res.status(404).json({
                message:"User Not Found"
            })
        }
        const isMatch = await bcrypt.compare(currentPassword, storedUser.password)

        if (!isMatch) {
            return res.status(400).json({
                message:"Current Password Incorrect"
            })
        }
        const saltRounds = 12;

        const hashPassword = await bcrypt.hash(newPassword, saltRounds)

        storedUser.password = hashPassword

        await storedUser.save()

        return res.status(200).json({
            message:"Password Changed Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Server Error"
        })
    }
}

export const changeEmail = async (req, res)=>{
    try {
        const {newEmail} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors:errors.array()
            })
        }
        const storedUser = await User.findById(req.user.id);
        if (!storedUser) {
            return res.status(404).json({
                message:"User Not found"
            })
        }
        storedUser.email = newEmail;
        await storedUser.save()
    } catch (error) {
        return res.status(500).json({
            message:"Server Error try again later"
        })
    }
}

export const Logout = async ()=>{
    try {
        res.clearCookie("accessToken", {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict"
        });
        res.status(200).json({
            message:"Logout sucessful"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Server Error"
        })
    }
}
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
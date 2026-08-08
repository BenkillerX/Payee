import { Router } from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";
import { changePassword, getCurrentUser, Logout, updateProfile } from "../controllers/userControllers.js";
import { passwordValidator, userProfileValidation } from "../validators/user.profile.validation.js";

const userRoutes = Router();

userRoutes.get("/me", authenticateToken, authorizeRoles('user'),  getCurrentUser);

// i used patch so that users can update whatever field they want.
userRoutes.patch("/me", authenticateToken, authorizeRoles("user", "admin"), userProfileValidation,  updateProfile)

//to allow users to change password
userRoutes.put("/password", authenticateToken,authorizeRoles("user", "admin") ,passwordValidator, changePassword)
userRoutes.post("/logout", Logout)
export default userRoutes;
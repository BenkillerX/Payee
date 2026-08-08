import { Router } from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";
import { getCurrentUser, updateProfile } from "../controllers/userControllers.js";
import { userProfileValidation } from "../validators/user.profile.validation.js";

const userRoutes = Router();

userRoutes.get("/me", authenticateToken, authorizeRoles('user'),  getCurrentUser);

// i used patch so that users can update whatever field they want.
userRoutes.patch('/me', authenticateToken, authorizeRoles("user", "admin"), userProfileValidation,  updateProfile)

export default userRoutes;
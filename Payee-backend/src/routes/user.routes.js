import { Router } from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";
import { getCurrentUser } from "../controllers/userControllers.js";

const userRoutes = Router();

userRoutes.get("/me", authenticateToken, authorizeRoles('user'),  getCurrentUser);

export default userRoutes;
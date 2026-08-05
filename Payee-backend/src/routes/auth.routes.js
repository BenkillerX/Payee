import { Router } from "express"
import { loginUser, registerUser } from "../controllers/authCOntrollers.js"
import { registerValidation } from "../validators/auth.validators.js"
const authRoutes = Router()

authRoutes.post('/register', registerValidation,  registerUser)
authRoutes.post('/login', loginUser)
export default authRoutes
import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from './src/routes/auth.routes.js'
import userRoutes from "./src/routes/user.routes.js";
dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)



connectDB().then(
    app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
})
)



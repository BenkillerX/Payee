import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from './src/routes/auth.routes.js'
dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes)


connectDB().then(
    app.listen(process.env.PORT, ()=>{
    console.log(`Server is runningg on port ${process.env.PORT}`);
})
)
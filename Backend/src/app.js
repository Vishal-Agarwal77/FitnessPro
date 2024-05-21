import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import router from "./routes/user.routes.js";

const app = express();

app.use(cors({
    credentials: true,
    origin: "https://fitnesspro-1.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.options('*',cors(corsOptions));

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router)

export { app }
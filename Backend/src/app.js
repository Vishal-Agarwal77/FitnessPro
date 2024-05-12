import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import router from "./routes/user.routes.js";

const app = express();

app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: "https://fitnesspro77.netlify.app"
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router)

export { app }
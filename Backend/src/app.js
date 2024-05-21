import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import router from "./routes/user.routes.js";

const app = express();

app.use(cors({
    credentials: true,
    origin: "https://fitnesspro-1.onrender.com"
}))
app.use(function (req, res, next) {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://fitnesspro-1.onrender.com"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);

    next();
})
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router)

export { app }
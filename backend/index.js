import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import MongoStore from 'connect-mongo'; // Solve memory leak on deployment

import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from "express-session";
import bodyParser from 'body-parser';

import transactionsRoute from "./routes/transactionsRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import PassportConfig from './passport-config.js';

// Setup .env
dotenv.config();
const port = process.env.PORT || 8000;
const mongodb_url = process.env.MONGODB_URL;
const session_secret = process.env.SESSION_SECRET || 'secret';

const app = express();

// Connect to MongoDB and listen to port
if (mongodb_url) {
    mongoose.connect(mongodb_url).then(() => {
        console.log("Connected to MongoDB Server");

        // Listen to port
        app.listen(port, () => {
            console.log(`Express app is now listening to port ${port}`);
        });
    }).catch((err) => {
        console.error("Error connecting to MongoDB Server: ", err.message);
    });
}
else {
    console.error("MongoDB URL is not defined.");
}

// Use Middleware
app.use(express.json());
app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
})); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({client: mongoose.connection.getClient()}), // To solve memory leak on deployment
    cookie: { 
        maxAge: 8 * 180 * 60 * 1000,
        httpOnly: true, // Helps mitigate certain types of attacks such as Cross-Site Scripting (XSS)
        sameSite: 'lax', // Helps protect against Cross-Site Request Forgery (CSRF) attacks
    },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(session_secret));
PassportConfig(passport);

// Use Routers
app.use("/", authRoute);
app.use("/transactions", transactionsRoute);
app.use("/users", userRoute);

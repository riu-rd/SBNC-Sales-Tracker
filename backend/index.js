import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import passport from 'passport';
import { Strategy } from "passport-local";
import cookieParser from 'cookie-parser';
import bcrypt from "bcryptjs";
import session from "express-session";
import bodyParser from 'body-parser';

import transactionsRoute from "./routes/transactionsRoute.js"

// Setup .env
dotenv.config();
const port = process.env.PORT || 8000;
const mongodb_url = process.env.MONGODB_URL;
const session_secret = process.env.SESSION_SECRET || 'secret';

const app = express();

// Use Middleware
app.use(express.json());
app.use(cors());
/* 
-- Custom origins for security using CORS policy --
app.use(cors({
    origin: 'some website',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
})); 
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: session_secret,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser(session_secret));

app.post("/login", async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

app.post("/register", async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

app.get("/user", async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});


// Use Routers
app.use("/transactions", transactionsRoute);

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

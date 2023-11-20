import express from "express";
import { User } from '../models/user.js';
import bcrypt from "bcryptjs";
import passport from "passport";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        if (
            !req.body.name || !req.body.email ||
            !req.body.password || !req.body.access
        ) {
            return res.status(400).json({message: "Send all required fields"});
        } else {
            const existingUser = await User.findOne({email: req.body.email});
            if (existingUser) {
                return res.status(403).json({message: "User already exists"});
            } else {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    access: req.body.access
                });
                await newUser.save();
                return res.status(201).json({message: "User created successfully"});
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
        try {
            if (err) {
                console.error(err.message);
                return res.status(500).send({ message: err.message });
            }
            if (!user) {
                return res.status(404).json({ message: "User does not exist"});
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send({ message: err.message });
                }
                return res.status(200).json({ message: "User Authenticated" });
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: err.message });
        }
    })(req, res, next);
});

router.get("/user", async (req, res) => {
    try {
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;
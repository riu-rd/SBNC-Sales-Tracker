import express from "express";
import { User } from '../models/user.js';
import bcrypt from "bcryptjs";
import passport from "passport";
import { checkAuthenticated, checkNotAuthenticated } from "./auth.js";

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

router.post("/login", checkNotAuthenticated, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        try {
            if (err) {
                console.error(err.message);
                return res.status(500).send({ message: err.message });
            }
            if (!user) {
                return res.status(404).json({ message: "Invalid User"});
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

router.get("/user", checkAuthenticated, async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.delete('/logout', checkAuthenticated, (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Error during logout" });
        }
        req.session.destroy((err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: "Error destroying session" });
            }
            res.status(200).json({ message: "Logout successful" });
        });
    });
});

export default router;
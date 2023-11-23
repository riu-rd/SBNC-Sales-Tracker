import express from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import { checkAuthenticated, checkNotAuthenticated, verifyEmail } from "./auth.js";

import { User } from '../models/user.js';
import { Token } from "../models/token.js";

const router = express.Router();

// Register a User
router.post("/register", async (req, res) => {
    try {
        if (
            !req.body.name || !req.body.branch || !req.body.email ||
            !req.body.password
        ) {
            return res.status(400).json({message: "Send all required fields"});
        } else {
            const existingUser = await User.findOne({email: req.body.email, verified: true});
            if (existingUser) {
                return res.status(403).json({message: "User already exists"});
            } else {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const newUser = new User({
                    name: req.body.name,
                    branch: req.body.branch,
                    email: req.body.email,
                    password: hashedPassword,
                });
                await newUser.save();

                // Generate Verification Token
                const newToken = new Token ({
                    userId: newUser._id, 
                    token: crypto.randomUUID()
                });
                await newToken.save();

                // Send Verification Email
                const link = `http://localhost:8080/confirm/${newToken.token}`;
                await verifyEmail(req.body.email, link);
                res.status(200).json({message: "User created: Confirmation email sent"});
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

// Confirm Verification Email
router.get("/confirm/:token", async (req, res) => {
    try {
        const token = await Token.findOne({token: req.params.token});
        console.log("Verifying Email with Token: ",token);
        await User.updateOne({_id:token?.userId},{$set:{verified: true}});
        await Token.findByIdAndDelete(token?._id);
        return res.status(201).redirect(`http://localhost:5173`);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

//Login a User
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

// Get the current logged in user
router.get("/user", checkAuthenticated, async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Logout current user
router.delete('/logout', checkAuthenticated, (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Error during logout" });
        }
        // @ts-ignore
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
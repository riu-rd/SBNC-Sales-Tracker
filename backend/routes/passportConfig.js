import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { Strategy } from "passport-local";

function PassportConfig(passport) {
    passport.use(new Strategy(async (email, password, next) => {
        try {
            console.log("Strategy working");
            const user = await User.findOne({email: email});
            console.log("Found user:", user);
            if (!user) {
                return next(null, false);
            } else {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    return next(null, user);
                } else {
                    return next(null, false);
                }
            }
        } catch (err) {
            console.error(err.message);
            return next(err);
        }
    }));

    passport.serializeUser(async (user, cookie) => {
        try {
            console.log("Serializing user");
            cookie(null, user.id);
        } catch (err) {
            console.error(err.message);
            cookie(err);
        }
    });

    passport.deserializeUser(async (id, cookie) => {
        console.log("Deserializing user");
        try {
            const user = await User.findById(id);
            if (user) {
                cookie(null, user);
            } else {
                cookie(null, false);
            }
        } catch (err) {
            console.error(err.message);
            cookie(err);
        }
    });
};

export default PassportConfig;
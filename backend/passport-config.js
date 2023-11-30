import { User } from "./models/user.js";
import bcrypt from "bcryptjs";
import { Strategy } from "passport-local";

function PassportConfig(passport) {
    
    passport.use(new Strategy({usernameField: 'email'}, async (email, password, done) => {
        try {
            const user = await User.findOne({email: email, verified: true, approved: true});
            
            if (!user) {
                return done(null, false);
            } else {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch && (user.verified === true)) {
                    console.log("Authenticated");
                    return done(null, user);
                } else {
                    console.log("Invalid Password");
                    return done(null, false);
                }
            }
        } catch (err) {
            console.error(err.message);
            return done(err);
        }
    }));

    passport.serializeUser(async (user, cookie) => {
        try {
            cookie(null, user.id);
        } catch (err) {
            console.error(err.message);
            cookie(err);
        }
    });

    passport.deserializeUser(async (id, cookie) => {
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
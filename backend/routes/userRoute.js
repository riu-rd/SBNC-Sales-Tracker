import express from 'express';
import { User } from '../models/user.js';
import { checkAuthenticated } from './auth.js';

const router = express.Router();
router.use(checkAuthenticated);

// READ
    // Get ALL USERS less than the access level of the current user 
router.get("/", async (req, res) => {
    try {
        
        // @ts-ignore
        const currentUser = await User.findOne({_id: req.session.passport.user});
        if (currentUser) {
            const level = currentUser.access;

            const users = await User.find({access:{ $lt: level }});
            return res.status(200).json(users);
        }
        else {
            res.status(401).json({message: "Unauthorized Access"});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

// UPDATE
    // Approve/Disapprove a User
router.patch("/approval/:id", async (req, res) => {
    try {
        // @ts-ignore
        const currentUser = await User.findOne({_id: req.session.passport.user});
        const level = currentUser?.access || 1;
        
        if (level > 1) {
            if (!req.body.approved.toString()) {
                return res.status(400).json({message: "Send all required fields"});
            }
    
            const { id } = req.params
            const result = await User.findByIdAndUpdate(id, {approved: req.body.approved});
            if (!result) {
                return res.status(404).json({message: "User not found"});
            }
            else {
                return res.status(200).json({message: "User approval modified"});
            }
        } else {
            return res.status(401).json({message: "Unauthorized Access"});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

    // Change Access Level of a User (only ADMIN)
router.patch("/access/:id", async (req, res) => {
    try {
        // @ts-ignore
        const currentUser = await User.findOne({_id: req.session.passport.user});
        const level = currentUser?.access || 1;

        if (level === 3) {
            if (!req.body.access) {
                return res.status(400).json({message: "Send all required fields"});
            }

            const { id } = req.params;
            const result = await User.findByIdAndUpdate(id, {access: req.body.access});
            if (!result) {
                return res.status(404).json({message: "User not found"});
            }
            else {
                return res.status(200).json({message: "User access modified"});
            }
        } else {
            return res.status(401).json({message: "Unauthorized Access"});
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
})

// DELETE
    // Delete a certain user
router.delete("/delete/:id", async (req, res) => {
    try {
        // @ts-ignore
        const currentUser = await User.findOne({_id: req.session.passport.user});
        const currentUserLevel = currentUser?.access || 1;

        const { id } = req.params;
        const deletingUser = await User.findById(id);
        const deletingUserLevel = deletingUser?.access || 1;

        if (currentUserLevel > deletingUserLevel) {
            const result = await User.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).json({message: "User not found"});
            }
            else {
                return res.status(200).json({message: "User deleted successfully"});
            }
        } else {
            return res.status(401).json({message: "Unauthorized Access"});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

    // Delete all unverified users
router.delete("/unverified", async (req, res) => {
    try {
        // @ts-ignore
        const currentUser = await User.findOne({_id: req.session.passport.user});
        const level = currentUser?.access || 1;
        if (level > 1) {
            const result = await User.deleteMany({verified: false});
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "No users found to delete" });
            } else {
                return res.status(200).json({ deletedcount: result.deletedCount });
            }
        } else {
            return res.status(401).json({message: "Unauthorized Access"});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

    // Delete all unapproved users
router.delete("/unapproved", async (req, res) => {
    try {
        // @ts-ignore
        const currentUser = await User.findOne({_id: req.session.passport.user});
        const level = currentUser?.access || 1;
        if (level > 1) {
            const result = await User.deleteMany({approved: false});
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "No users found to delete" });
            } else {
                return res.status(200).json({ deletedcount: result.deletedCount });
            }
        } else {
            return res.status(401).json({message: "Unauthorized Access"});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;
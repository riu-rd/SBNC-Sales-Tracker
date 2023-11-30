import express from "express";
import { Transaction } from '../models/transaction.js';
import { User } from "../models/user.js";
import { checkAuthenticated,  sendAdminEditUpdate} from "./auth.js";

const router = express.Router();
router.use(checkAuthenticated);

// CREATE
router.post("/", async (req, res) => {
    try {
        if (
            !req.body.date || !req.body.name || !req.body.series ||
            !req.body.os || !req.body.invoice || !req.body.seller ||
            !req.body.assembler || !req.body.total || !req.body.vatsale ||
            !req.body.vatamount || !req.body.branch || !req.body.addedby
        ) {
            return res.status(400).json({message: "Send all required fields"});
        }

        const newTransaction = new Transaction({
            date: req.body.date, 
            name: req.body.name, 
            series: req.body.series, 
            os: req.body.os, 
            invoice: req.body.invoice, 
            seller: req.body.seller, 
            assembler: req.body.assembler, 
            total: req.body.total, 
            vatsale: req.body.vatsale, 
            vatamount: req.body.vatamount, 
            branch: req.body.branch, 
            addedby: req.body.addedby
        });

        await newTransaction.save();
        return res.status(201).json({message: "Transaction created successfully"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

// READ
    // [DEFAULT] Get DATE FILTER transactions
router.get("/:startdate/:enddate", async (req, res) => {
    try {
        // Default to the current month if startdate and enddate are not provided
        const startDate = req.params.startdate || new Date().toISOString();
        const endDate = req.params.enddate || new Date().toISOString();
        console.log("Get Request From: ", startDate, " To: ", endDate);

        const transactions = await Transaction.find({
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: -1 });

        return res.status(200).json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: err.message });
    }
});

    // Get ALL transactions
router.get("/all", async (req, res) => {
    try {
        const transactions = await Transaction.find({}).sort({ date: -1 });
        return res.status(200).json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

    //Get SINGLE transaction by its ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        return res.status(200).json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        if (
            !req.body.date || !req.body.name || !req.body.series ||
            !req.body.os || !req.body.invoice || !req.body.seller ||
            !req.body.assembler || !req.body.total || !req.body.vatsale ||
            !req.body.vatamount || !req.body.branch
        ) {
            return res.status(400).json({message: "Send all required fields"});
        }

        // @ts-ignore
        const level = req.user.access;
        if (level > 1 ) {
            const { id } = req.params; 
            const result = await Transaction.findByIdAndUpdate(id, req.body);
            if (!result) {
                return res.status(404).json({message: "Transaction not found"});
            }
            else { 
                // send response that transaction has been updated
                res.status(200).json({message: "Transaction updated successfully"});

                // Send transaction edit details to the admin
                const adminUser = await User.findOne({ access: 3, verified: true, approved: true });
                if (!adminUser) {
                    return res.status(404).json({ message: "Admin user not found" });
                }
                const adminEmail = adminUser.email;

                const currentTime = new Date().toLocaleString();
                const emailSubject = `Transaction Edit - ${currentTime}`;

                const emailHTML = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #112376;">
                    <h2 style="color: #112376;">Transaction Edit Notification</h2>
                    <p>Dear Admin,</p>
                    <p>This is to inform you that a transaction with C-Series ${req.body.series} has been edited.</p>
                    <p>
                        <strong>Editor:</strong> ${
    // @ts-ignore
                        req.user.name} (${req.user.email})
                    </p>
                    <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
                        <tr style="background-color: #112376; color: white;">
                            <th>Date</th>
                            <th>Branch</th>
                            <th>Name of Customer</th>
                            <th>C-Series</th>
                            <th>OS</th>
                            <th>C-Invoice</th>
                            <th>Seller</th>
                            <th>Assembler</th>
                            <th>Total</th>
                            <th>VAT Sale</th>
                            <th>VAT Amount</th>
                        </tr>
                        <tr>
                            <td>${req.body.date}</td>
                            <td>${req.body.branch}</td>
                            <td>${req.body.name}</td>
                            <td>${req.body.series}</td>
                            <td>${req.body.os}</td>
                            <td>${req.body.invoice}</td>
                            <td>${req.body.seller}</td>
                            <td>${req.body.assembler}</td>
                            <td>${req.body.total}</td>
                            <td>${req.body.vatsale}</td>
                            <td>${req.body.vatamount}</td>
                        </tr>
                    </table>
                    <p>This update was made at ${currentTime}.</p>
                    <p>Best regards,<br/>SBNC Transaction System</p>
                </div>
                `;
                await sendAdminEditUpdate(adminEmail, emailSubject, emailHTML);
            }
        } else {
            return res.status(401).json({message: "Unauthorized Access"});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        // @ts-ignore
        const level = req.user.access;
        if (level > 1) {
            const { id } = req.params;
            const result = await Transaction.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).json({message: "Transaction not found"});
            }
            else {
                return res.status(200).json({message: "Transaction deleted successfully"});
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
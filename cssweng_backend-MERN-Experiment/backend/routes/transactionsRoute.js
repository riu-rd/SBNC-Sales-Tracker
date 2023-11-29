import express from "express";
import { Transaction } from '../models/transaction.js';
import { checkAuthenticated } from "./auth.js";

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

        const { id } = req.params; 
        const result = await Transaction.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({message: "Transaction not found"});
        }
        else {
            return res.status(200).json({message: "Transaction updated successfully"});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Transaction.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({message: "Transaction not found"});
        }
        else {
            return res.status(200).json({message: "Transaction deleted successfully"});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;
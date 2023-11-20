import express from "express";
import { Transaction } from '../models/transaction.js';

const router = express.Router();

// Create
router.post("/", async (req, res) => {
    try {
        if (
            !req.body.date || !req.body.name || !req.body.series ||
            !req.body.os || !req.body.invoice || !req.body.seller ||
            !req.body.assembler || !req.body.total || !req.body.vatsale ||
            !req.body.vatamount || !req.body.branch
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
        });

        await newTransaction.save();
        return res.status(201).json({message: "Transaction created successfully"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

// Read
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        transactions.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getDate() - dateA.getDate();
        });
        return res.status(200).json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
});

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

// Update
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

// Delete
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
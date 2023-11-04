const Transaction = require('../modal/transaction.js');

const transactionsController = {
    postTransaction: (req, res) => {
        const { date, name, series, os, invoice, seller, assembler, total, vatsale, vatamount } = req.body;
        console.log(date);
        const newTransaction = new Transaction ({
            date, name, series, os, invoice, seller, assembler, total, vatsale, vatamount
        });

        newTransaction.save().then(()=>{
            res.send({success: true});
        }).catch(err => {
            res.status(500).send({success: false});
        });
    }
}

module.exports = transactionsController;
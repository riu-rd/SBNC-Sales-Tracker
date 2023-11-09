const express = require('express')
const router = express.Router()
const User = require('../modal/user')
const Transaction = require('../modal/transaction');
const transactionsController = require("../controllers/transactionsController.js");

router.get('/', checkAuthenticated, async (req, res) => {
     console.log(req.session.passport.user)
     try {
          let user = await User.findById(req.session.passport.user);
          let fromDate = req.query.from_date; 
          let toDate = req.query.to_date; 
          let transactions;

          if (fromDate && toDate) {
               // Find transactions within the date range
               transactions = await Transaction.find({
                    date: {
                         $gte: fromDate, // Filter transactions with dates greater than or equal to fromDate
                         $lte: toDate  // Filter transactions with dates less than or equal to toDate
                    }
               });
          }
          else {
               transactions = await Transaction.find({});
          }

          let transactionArray = transactions.map(transaction => {
               return {
                 date: transaction.date,
                 branch: transaction.branch,
                 name: transaction.name,
                 series: transaction.series,
                 os: transaction.os,
                 invoice: transaction.invoice,
                 seller: transaction.seller,
                 assembler: transaction.assembler,
                 total: transaction.total,
                 vatsale: transaction.vatsale,
                 vatamount: transaction.vatamount 
          }});

          transactionArray.sort((a, b) => {
               const dateA = new Date(a.date);
               const dateB = new Date(b.date);
               return dateB - dateA;
          });

          if(transactionArray.length <= 0) {
               transactionArray = [];
          }

          res.render('home', {
               title: "Dashboard",
               name: user.name,
               transactions: transactionArray,
               layout: "dashboard"
          });
     } catch (err){
          console.log(err)
     }
});

router.delete('/delete-transaction', async (req, res) => {
    const { date, branch } = req.body;

    console.log(`Received delete request for date: ${date} and branch: ${branch}`);

    try {
        // Find and remove the transaction based on date and branch
        const result = await Transaction.findOneAndRemove({ date, branch });

        if (result) {
            // Transaction was found and deleted
            console.log('Transaction removed successfully');
            res.status(200).json({ message: 'Transaction removed successfully' });
        } else {
            // Transaction was not found
            console.log('Transaction not found');
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ message: 'Transaction removal failed' });
    }
})

router.post('/', async (req,res) => {
     
})

router.delete('/logout', async (req,res)=> {
     req.logout(function(err) {
       if (err) { 
         return next(err)
       }
       res.redirect('/login')
     })
   })


function checkAuthenticated(req, res, next){
     if (req.isAuthenticated()) {
          return next()
     }
     res.redirect('/login')
}

router.post("/post-transaction", transactionsController.postTransaction);
router.get("/download-transactions", transactionsController.downloadTransactions);
router.get("/filter", transactionsController.filterTransaction);

module.exports = router
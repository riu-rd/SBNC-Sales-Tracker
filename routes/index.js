const express = require('express')
const router = express.Router()
const User = require('../modal/user')
const Transaction = require('../modal/transaction');
const transactionsController = require("../controllers/transactionsController.js");

router.get('/', checkAuthenticated, async (req, res) => {
     console.log(req.session.passport.user)
     try {
          let user = await User.findById(req.session.passport.user);
          let transactions = await Transaction.find({});

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
               transactionArray = [{date: "no data", branch: "no data", name: "no data", series: 0, os: 0, invoice: 0,
                                   seller: "no data", assembler: "no data", total: 0, vatsale: 0, vatamount: 0}];
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
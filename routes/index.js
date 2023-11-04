const express = require('express')
const router = express.Router()
const User = require('../modal/user')
const Transaction = require('../modal/transaction');
const transactionsController = require("../controllers/transactionsController.js");



router.get('/', checkAuthenticated, async (req, res) => {
     console.log(req.session.passport.user)
     try {
          user = await User.findById(req.session.passport.user);
          transactions = await Transaction.find({});

          transactionArray = transactions.map(transaction => {
               return {
                 date: transaction.date,
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
     } catch (err){
          console.log(err)
     }
     res.render('home', {
          title: "Dashboard",
          name: user.name,
          transactions: transactionArray,
          layout: "dashboard"
     });
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

module.exports = router
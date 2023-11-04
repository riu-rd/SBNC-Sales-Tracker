const express = require('express')
const router = express.Router()
const User = require('../models/user')



router.get('/', checkAuthenticated, async (req, res) => {
     console.log(req.session.passport.user)
     try {
          user = await User.findById(req.session.passport.user)
     } catch (err){
          console.log(err)
     }
     res.render('home', {name: user.name})
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

module.exports = router
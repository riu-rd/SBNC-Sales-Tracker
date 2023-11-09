const express = require('express')
const router = express.Router()
const User = require('../modal/user')
const { access } = require('fs')



router.get('/', checkAuthenticated, async (req, res) => {
     console.log(req.session.passport.user)
     const currSession = req.session.passport.user
     
     try {
          currUser = await User.findOne({'_id': currSession}).select('-_id -password')
          if (currUser.access >= 2) {
               var permission = 1
          }
          user = await User.findById(req.session.passport.user)
     } catch (err){
          console.log(err)
     }
     res.render('home', {name: currUser.name, title: 'Home', accessUser: permission})
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
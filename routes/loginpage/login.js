const express = require('express')
const router = express.Router()
const passport = require('passport')


router.get('/',checkNotAutheticated, (req, res) => {
     res.render('login', ({title: "Login"}))
})

router.post('/', passport.authenticate('local',{
     successRedirect: '/',
     failureRedirect: '/login',
     failureFlash:  true
}))
function checkNotAutheticated(req, res, next){
     if (req.isAuthenticated()) {
          res.redirect('/')
     }
     next()
}

module.exports = router
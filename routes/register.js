const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../modal/user')

//renders the website
router.get('/',checkNotAutheticated, (req, res) => {
     res.render('register')
})

//makes the account and store withint the database
router.post('/', async (req, res) => {
     try {
          const hashedPassword = await bcrypt.hash(req.body.password,10)
          const user = new User({
               name: req.body.name,
               email: req.body.email,
               password: hashedPassword,
               access: 0
          })
          console.log(user)
          const newUser = await user.save()
          console.log('Register Sucessful')
          res.redirect('login')
     } catch {
          res.status(401).render('register', {
               title: 'register',
               errorMessage: 'Invalid email or name'
          })
          console.log('Register Failed')
     }
})
function checkNotAutheticated(req, res, next){
     if (req.isAuthenticated()) {
          res.redirect('/')
     }
     next()
}
module.exports = router
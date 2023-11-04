const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../../models/user')

//renders the website
router.get('/',checkNotAutheticated, (req, res) => {
     res.render('register')
})

//makes the account and store withint the database
router.post('/', async (req, res) => {
     try {
          const hashedPassword = await bcrypt.hash(req.body.password,10)
          console.log(await bcrypt.compare(req.body.confirmPassword, hashedPassword))
          if (!(await bcrypt.compare(req.body.confirmPassword, hashedPassword))){
               console.log('Password and confirm password are different')
               throw new Error('Password and confirm password are different')
          }
          const user = new User({
               name: req.body.name,
               email: req.body.email,
               password: hashedPassword,
               number: req.body.number,
               access: 0
          })
          console.log(user)
          const newUser = await user.save()
          console.log('Register Sucessful')
          res.redirect('login')
     } catch(err) {
          console.log(err.name)
          if ('Error' == err.name) {
               message = err.message
          }
          else {
               message = 'Invalid name or email'
          }
          res.render('register', {
               title: 'register',
               errorMessage: message
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
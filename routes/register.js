const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../modal/user')

router.get('/', (req, res) => {
     res.render('register')
})

router.post('/', async (req, res) => {
     const hashedPassword = await bcrypt.hash(req.body.password,10)
     const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
     })
     console.log(user)
     try {
          const newUser = await user.save()
          console.log('Register Sucessful')
          res.render('login')
     } catch {
          console.log('Register Failed')
          res.render('register', {
               user: user,
               errorMessage: 'Invalid email or name'
          })
     }
})

module.exports = router
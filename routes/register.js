const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
     res.render('register')
})

router.post('/', async (req, res) => {
     try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10)
          res.redirect('/login')
     } catch {
          res.redirect('/register')
     }
     console.log(req.body.email)
})

module.exports = router
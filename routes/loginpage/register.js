const express = require('express')
const router = express.Router()

const controller = require('../../controllers/registerController')

//renders the website
router.get('/',checkNotAutheticated, (req, res) => {
     res.render('register')
})

//makes the account and store withint the database
router.post('/', controller.postUser)

function checkNotAutheticated(req, res, next){
     if (req.isAuthenticated()) {
          res.redirect('/')
     }
     next()
}
module.exports = router
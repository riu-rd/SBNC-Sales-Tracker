const express = require('express')
const router = express.Router()
const User = require('../modal/user')

const authenticateController = require('../controllers/checkAuthetication')
const userController = require('../controllers/userListController')

router.get('/', authenticateController.checkAuthenticated, async (req, res) => {
     
})

router.post('/', async (req,res) => {
     
})



module.exports = router
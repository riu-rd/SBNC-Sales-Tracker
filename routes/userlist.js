const express = require('express')
const router = express.Router()
const User = require('../modal/user')

const authenticateController = require('../controllers/checkAuthetication')
const userController = require('../controllers/userListController')

router.get('/', authenticateController.checkAuthenticated,authenticateController.checkLevel, userController.getUsers)

router.post('/', async (req,res) => {
     
})



module.exports = router
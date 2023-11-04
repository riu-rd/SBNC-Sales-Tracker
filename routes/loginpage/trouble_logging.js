const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/', async(req, res) => {
     res.render('trouble_logging')
})

router.post('/', async(req, res) => {
     
})

module.exports = router
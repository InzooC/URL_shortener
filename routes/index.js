const express = require('express')
const { route } = require('./modules/home')
const router = express.Router()
const home = require('./modules/home')

router.use('/', home)


module.exports = router
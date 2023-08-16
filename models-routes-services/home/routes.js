const router = require('express').Router()
const services = require('./services')


router.get('/home',services.get)

module.exports = router

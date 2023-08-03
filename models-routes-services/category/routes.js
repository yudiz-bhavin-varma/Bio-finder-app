const router = require('express').Router()
const services = require('./services')


router.get('/category', services.get)

module.exports = router

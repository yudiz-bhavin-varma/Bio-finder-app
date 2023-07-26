const router = require('express').Router()
const services = require('./services')


router.get('/', services.get)

module.exports = router

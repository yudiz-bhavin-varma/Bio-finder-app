const router = require('express').Router()
const services = require('./services')


router.get('/questions', services.get)

module.exports = router

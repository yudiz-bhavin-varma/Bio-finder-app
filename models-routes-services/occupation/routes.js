const router = require('express').Router()
const services = require('./services')


router.get('/occupation',services.getOccupation)

module.exports = router

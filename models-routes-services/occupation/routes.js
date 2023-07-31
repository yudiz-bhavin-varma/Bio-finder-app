const router = require('express').Router()
const services = require('./services')


router.get('/occupation',services.get)
router.post('/occupation/add', services.createOccupation)

module.exports = router

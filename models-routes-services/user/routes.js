const router = require('express').Router()
const services = require('./services')


router.get('/users', services.get)
router.post('/users/format/data', services.formatAndInsert)


module.exports = router

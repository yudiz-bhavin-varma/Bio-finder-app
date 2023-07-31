const router = require('express').Router()
const services = require('./services')


router.get('/useinfo', services.get)
router.get('/userinfo/format/data', services.formatAndInsert)


module.exports = router

const router = require('express').Router()
const services = require('./services')


router.get('/questions', services.get)
// router.get('/questions/create/slug', services.createSlug)


module.exports = router

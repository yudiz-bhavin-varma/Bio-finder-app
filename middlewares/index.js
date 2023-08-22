const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const hpp = require('hpp')

const config = require('../config/config')

module.exports = (app) => {

  // app.use(morgan('dev'))

  const corsConfig = {
    origin: '*',
    methods: '*'
  }

  app.use(cors(corsConfig))
  app.options("", cors(corsConfig))

  app.use(helmet())
  app.disable('x-powered-by')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(hpp())

  /* global appRootPath */
  app.use(express.static(path.join(appRootPath, 'public')))
  app.set('view engine', 'ejs')

  app.use(compression({
    filter: function (req, res) {
      if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
      }
      // fallback to standard filter function
      return compression.filter(req, res)
    }
  }))

  // set language in request object
  app.use((req, res, next) => {
    switch (req.header('Language')) {
      case 'en-us':
        req.userLanguage = 'English'
        break

      case 'pt-br':
        req.userLanguage = 'Portuguese'
        break

      default :
        req.userLanguage = 'English'
    }
    next()
  })
}

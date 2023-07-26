const Redis = require('ioredis')
const config = require('../config/config')
const { handleCatchError } = require('./utilities.services')
const sanitizeHtml = require('sanitize-html')

console.log("config")
console.log(config)
const redisClient = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD
})

redisClient.on('error', function (error) {
  console.log('Error in Redis', error)
  handleCatchError(error)
  process.exit(1)
})

redisClient.on('connect', function () {
  console.log('redis connected')
})

module.exports = {

  cacheRoute: function (duration) {
    return async (req, res, next) => {
      const key = '__express__' + sanitizeHtml(req.originalUrl || req.url)
      if (process.env.NODE_ENV === 'dev') return next()
      const cachedBody = await redisClient.get(key)
      if (cachedBody) {
        res.setHeader('is-cache', 1)
        res.setHeader('content-type', 'application/json')
        return res.send(cachedBody)
      } else {
        res.sendResponse = res.send
        res.send = (body) => {
          redisClient.set(key, body, 'EX', duration)
          res.setHeader('content-type', 'application/json')
          res.sendResponse(body)
        }
        next()
      }
    }
  },

  checkRateLimit: async function (threshold, path, ip) {
    // return async function (req, res, next) {
    try {
      // if (process.env.NODE_ENV === 'dev') return
      const ipLimit = await redisClient.incr(`${path}:${ip}`)

      if (ipLimit > threshold) {
        return 'LIMIT_REACHED'
      } else {
        const ttl = await redisClient.ttl(`${path}:${ip}`)
        if (ttl === -1) {
          await redisClient.expire(`${path}:${ip}`, 1800)
        }
        // return next()
        return
      }
    } catch (error) {
      handleCatchError(error)
      // return next()
    }
    // }
  },

 
  checkRateLimitOTP: function (sLogin, sType, sAuth) {
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV === 'dev') resolve()
      if (!sLogin || !sType || !sAuth) resolve()
      redisClient.incr(`rlotp:${sLogin}:${sType}:${sAuth}:${(new Date()).getHours()}`).then(data => {
        if (data > 5) {
          resolve('LIMIT_REACHED')
        } else {
          redisClient.expire(`rlotp:${sLogin}:${sType}:${sAuth}:${(new Date()).getHours()}`, 1800).then().catch()
          resolve()
        }
      }).catch(error => {
        handleCatchError(error)
        resolve()
      })
    })
  },
  redisClient
}



const { messages, status, jsonStatus } = require('./api.responses')



/**
  * It'll remove all nullish, not defined and blank properties of input object.
  * @param {object}
  */
const removenull = (obj) => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName]
    }
  }
}

const catchError = (name, error, req, res) => {
  handleCatchError(error)
  return res.status(status.InternalServerError).jsonp({
    status: jsonStatus.InternalServerError,
    message: messages[req.userLanguage].error
  })
}

const handleCatchError = (error) => {
  if (process.env.NODE_ENV === 'production') Sentry.captureMessage(error)
  console.log('**********ERROR***********', error)
}

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key]
    }
    return obj
  }, {})
}

const checkAlphanumeric = (input) => {
  const letters = /^[0-9a-zA-Z]+$/
  return !!(input.match(letters))
}


const getIp = function (req) {
  try {
    let ip = req.header('x-forwarded-for') ? req.header('x-forwarded-for').split(',') : []
    ip = ip[0] || req.socket.remoteAddress
    return ip
  } catch (error) {
    handleCatchError(error)
    return req.socket.remoteAddress
  }
}

module.exports = {
  removenull,
  catchError,
  handleCatchError,
  pick,
  checkAlphanumeric,
  getIp,
}

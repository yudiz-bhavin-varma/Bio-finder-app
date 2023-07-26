const { status, jsonStatus, messages } = require('../../helper/api.responses')

class User {
  async get(req, res) {
    try {
      return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: messages[req.userLanguage].success.replace('##', messages[req.userLanguage].cMatchLogs), data })
    } catch (error) {
      catchError('user.get', error, req, res)
    }
  }
}



module.exports = new User()

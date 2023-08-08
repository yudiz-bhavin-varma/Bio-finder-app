const { status, jsonStatus, messages } = require('../../helper/api.responses')
const CategoryModel  = require('./model')
const {catchError,pick} = require('../../helper/utilities.services')

class categoryInfo {
  async get(req, res) {
    try {
      const { size, search, pageNumber} = pick(req.query, ['size', 'search', 'pageNumber'])
      const skip = parseInt(pageNumber - 1 || 0) * parseInt(size || 10)
      const limit = parseInt(size || 10)
      const condition = {'show':true }
      const projection = {'show':false}
      let [category,total] = await Promise.all([
        CategoryModel.find(condition,projection).sort({"bTopRated": 1 }).skip(skip).limit(limit),
        CategoryModel.countDocuments(condition,projection)
      ])      
      return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: messages[req.userLanguage].success.replace('##', messages[req.userLanguage].category), data:{category,total} })
    } catch (error) {
      catchError('categoryInfo.get', error, req, res)
    }
  }
}
module.exports = new categoryInfo()

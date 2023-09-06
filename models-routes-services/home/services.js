const { status, jsonStatus, messages } = require('../../helper/api.responses')
const questionModel = require('../question/model')
const userInfoModel = require('../user-info/model')

const { catchError,pick } = require('../../helper/utilities.services')
class Home {

  //need to optimize this route, create proper flow for this.
  async get(req, res) {
    try {
      const { size, sort, orderBy, pageNumber } = pick(req.query, ['size', 'sort', 'orderBy', 'pageNumber'])
      const oSort = {}
      if (!sort) oSort.bTopRated = 1
      if (sort) oSort[sort] = orderBy === 'DESC' ? -1 : 1
      const skip = parseInt(pageNumber - 1 || 0) * parseInt(size || 5)
      const limit = parseInt(size || 5)
      let ans = []
      const questions = await questionModel.find({ show: true, bTopRated:true },{'eStatus':false, '__v':false,'dCreatedAt':false,'dUpdatedAt':false }).sort(oSort).skip(skip).limit(limit).lean()
      if(questions.length){
        let categoryValues = questions.map((data) => data.categoryValue)
        ans = await userInfoModel.aggregate([{
          $unwind: '$aProfileFields'
        },{
          $match:{
            'aProfileFields.sLableId':{$in:categoryValues },
            'aProfileFields.sDisplayText':{$ne:""}
          }
        },{
          $group:{
              "_id":"$aProfileFields.sLableId",
              value:{
                  $push:'$aProfileFields.sDisplayText'
              }
          }
        },{
            $project:{
                "_id": 1, 
                value: { 
                    $slice: [ "$value", 5 ] 
                  } 
            }
        }])
      } 
      return res.status(status.OK).json({ status: jsonStatus.OK, message: messages[req.userLanguage].success.replace('##', messages[req.userLanguage].questionAns),data:{questions,ans}})
    } catch (error) {
      catchError('home.get', error, req, res)
    }
  }
}


module.exports = new Home()

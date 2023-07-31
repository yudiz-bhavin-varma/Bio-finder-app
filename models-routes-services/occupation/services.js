const { status, jsonStatus, messages } = require('../../helper/api.responses')
const occupationModel = require('../occupation/model')
const { catchError } = require('../../helper/utilities.services')
class Occupation {
  
  async get(req, res) {
    try {
      const { size, sort, orderBy, pageNumber } = pick(req.query, ['size', 'sort', 'orderBy', 'pageNumber'])
      const oSort = {}
      if (!sort) oSort.dCreatedDate = -1
      if (sort) oSort[sort] = orderBy === 'DESC' ? -1 : 1
      const skip = parseInt(pageNumber - 1 || 0) * parseInt(size || 20)
      const limit = parseInt(size || 20)
      const occupation = await occupationModel.find({ eStatus: 'Y' }).sort(oSort).skip(skip).limit(limit).lean()
      return res.status(status.OK).json({ status: jsonStatus.OK, message: messages[req.userLanguage].success.replace('##', messages[req.userLanguage].occupation)},{occupation})
    } catch (error) {
      catchError('occupation.get', error, req, res)
    }
  }

  async createOccupation(req, res) {
    try {
      let occupations =[{
        sName:"Doctor",
        eStatus:'Y'
      },{
        sName:"Musician",
        eStatus:'Y'
      },{
        sName:"Fashion Designer",
        eStatus:'Y'
      },{
        sName:"Photographer",
        eStatus:'Y'
      },{
        sName:"Enginner",
        eStatus:'Y'
      },{
        sName:"Manager",
        eStatus:'Y'
      },{
        sName:"Consultant",
        eStatus:'Y'
      },{
        sName:"Analyst",
        eStatus:'Y'
      },{
        sName:"HR",
        eStatus:'Y'
      },{
        sName:"Researcher",
        eStatus:'Y'
      },{
        sName:"Unemployed",
        eStatus:'Y'
      },{
        sName:"Entrepreneur",
        eStatus:'Y'
      },{
        sName:"Architect",
        eStatus:'Y'
      },{
        sName:"Writer",
        eStatus:'Y'
      },{
        sName:"Psychologist",
        eStatus:'Y'
      },{
        sName:"Lawyer",
        eStatus:'Y'
      },{
        sName:"Chef",
        eStatus:'Y'
      },{
        sName:"UX designer",
        eStatus:'Y'
      },{
        sName:"Physiotherapist",
        eStatus:'Y'
      },{
        sName:"Banker",
        eStatus:'Y'
      },{
        sName:"Actor",
        eStatus:'Y'
      },{
        sName:"Actress",
        eStatus:'Y'
      },{
        sName:"Accountant",
        eStatus:'Y'
      },{
        sName:"Journalist",
        eStatus:'Y'
      },{
        sName:"Hair stylist",
        eStatus:'Y'
      },{
        sName:"Librarian",
        eStatus:'Y'
      },{
        sName:"Social worker",
        eStatus:'Y'
      },{
        sName:"Pilot",
        eStatus:'Y'
      },{
        sName:"Gov. Employee",
        eStatus:'Y'
      },{
        sName:"Artist",
        eStatus:'Y'
      },{
        sName:"Fashion Designer",
        eStatus:'Y'
      },{
        sName:"Economist",
        eStatus:'Y'
      },{
        sName:"Professor",
        eStatus:'Y'
      },{
        sName:"Pharmacist",
        eStatus:'Y'
      },{
        sName:"Student",
        eStatus:'Y'
      },{
        sName:"Choreographer",
        eStatus:'Y'
      },{
        sName:"Other",
        eStatus:'Y'
      }]
      await occupationModel.insertMany(occupations)
      return res.status(status.OK).json({ status: jsonStatus.OK, message: messages[req.userLanguage].success.replace('##', messages[req.userLanguage].occupation)},{occupation})
    } catch (error) {
      catchError('occupation.createOccupation', error, req, res)
    }
  }

}


module.exports = new Occupation()

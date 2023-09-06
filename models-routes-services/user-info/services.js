const { status, jsonStatus, messages } = require('../../helper/api.responses')
const UserInfoModel  = require('../user-info/model')
const QuestionModel = require('../question/model')

const { catchError,pick } = require('../../helper/utilities.services')

class Userinfo {
  async get(req, res) {
    try {
      const { size, search,pageNumber,occupation, type} = pick(req.query, ['size', 'search', 'pageNumber','occupation','type'])
      const skip = parseInt(pageNumber - 1 || 0) * parseInt(size || 100)
      const limit = parseInt(size || 100)
      const condition = {}
      const projection = {'aProfileFields.sDisplayText':true,'aProfileFields.sLableId':true,'nAge':true,'sResidenceCity':true,'sGender':true,'sResidenceState':true,'sResidenceCountry':true,'sHomeCity':true,'sHomeState':true,'sHomeCountry':true ,'sOccupation':true}
      if(occupation) condition['sOccupation'] = occupation
      if(search) condition['aProfileFields.sDisplayText'] = { $regex: new RegExp('^.*' + search + '.*', 'i') }
      
      let data = {question:{},ans:[]}
      let question = await QuestionModel.findOne({"categoryValue":type},{"text":true}).lean()
      data.question = question
      if(question){
      let ans = await UserInfoModel.aggregate([{
        $match:condition
      },{
        $unwind: '$aProfileFields'
      },{
        $match:{
          'aProfileFields.sLableId':type,
          'aProfileFields.sDisplayText':{$ne:""}
        }
      },{
          $project:projection
      },{
          $sort:{
              "_id":-1
          }
      },{
          $skip:skip
      },{
          $limit:limit
      }])
      data.ans = ans
      }
      return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: messages[req.userLanguage].success.replace('##', messages[req.userLanguage].userinfo), data })
    } catch (error) {
      catchError('user.get', error, req, res)
    }
  }

  async getDetails(req, res) {
    try {
      let data = await UserInfoModel.findOne({"_id": req.params.id },{"dCreatedAt": false, "dUpdatedAt":false, "eProvider":false,"iUserId":false,"__v":false })
      return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: messages[req.userLanguage].success.replace('##', messages[req.userLanguage].userinfo), data })
    } catch (error) {
      catchError('user.get', error, req, res)
    }
  }

  async getRandomDetails(req,res){
    try {
      let category = await QuestionModel.aggregate([{$match:{"bTopRated":true}},{$sample: { size: 1 }}])
      let data = await UserInfoModel.aggregate([{
        $unwind: '$aProfileFields'
      },{
        $match:{
          'aProfileFields.sLableId':category[0].categoryValue,
          'aProfileFields.sDisplayText':{$ne:""}
        }
      },
      {
          $project:{
            aProfileFields:true
          }
      },{
          $sample:{
              size: 1
          }
      }])

      return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: messages[req.userLanguage].success.replace('##', messages[req.userLanguage].randomDetails), data })
    } catch (error) {
      catchError('user.get', error, req, res)
    }
  }

  async formatAndInsert(req, res) {
    for (let data of users) {
      dataToPush = {}
      let { name, age, gender, profile_fields, jobs, residence, hometown } = data.user
      console.log(hometown)
      let occupation = 'other'
      let profileField = []
      for (let record of profile_fields) {
        if (record?.name === "Occupation") {
          let profession = record.display_value.toLowerCase()
          occupation = assignProfession(profession)
        }
        profileField.push({
          lableId: record.id,
          labelName: record.name,
          displayText: record.display_value.replace(/(\r\n|\n|\r)/gm, "")
        })
      }
      finaldataToPush.push({
        sName:name,
        nAge:age,
        sGender:gender,
        sResidenceCity: residence?.city?.name || "",
        sResidenceState: residence?.region?.name || "",
        sResidenceCountry: residence?.country?.name || "",
        sHomeCity: hometown?.city?.name || "",
        sHomeState: hometown?.region?.name || "",
        sHomeCountry: hometown?.country?.name || "",
        sOccupation:occupation,
        aProfileFields:profileField
      })
    }
  }
}

function assignProfession(jobDescription) {
  if (jobDescription.includes("doctor")) return "Doctor"
  else if (jobDescription.includes("musician")) return "Musician"
  else if (jobDescription.includes("fashion designer")) return "Fashion Designer"
  else if (jobDescription.includes("photographer")) return "Photographer"
  else if (jobDescription.includes("enginner")) return "Enginner"
  else if (jobDescription.includes("manager")) return "Manager"
  else if (jobDescription.includes("consultant")) return "Consultant"
  else if (jobDescription.includes("analyst")) return "Analyst"
  else if (jobDescription.includes("hr")) return "HR"
  else if (jobDescription.includes("researcher")) return "Researcher"
  else if (jobDescription.includes("unemployed")) return "Unemployed"
  else if (jobDescription.includes("entrepreneur")) return "Entrepreneur"
  else if (jobDescription.includes("architect")) return "Architect"
  else if (jobDescription.includes("founder")) return "Entrepreneur"
  else if (jobDescription.includes("writer")) return "Writer"
  else if (jobDescription.includes("psychologist")) return "Psychologist"
  else if (jobDescription.includes("lawyer")) return "Lawyer"
  else if (jobDescription.includes("advocate")) return "Advocate"
  else if (jobDescription.includes("chef")) return "Chef"
  else if (jobDescription.includes("cook")) return "Cook"
  else if (jobDescription.includes("ux designer")) return "UX designer"
  else if (jobDescription.includes("physiotherapist")) return "Physiotherapist"
  else if (jobDescription.includes("banker")) return "Banker"
  else if (jobDescription.includes("actor")) return "Actor"
  else if (jobDescription.includes("actress")) return "Actress"
  else if (jobDescription.includes("accountant")) return "Accountant"
  else if (jobDescription.includes("journalist")) return "Journalist"
  else if (jobDescription.includes("barber")) return "Hair stylist"
  else if (jobDescription.includes("hairstylist")) return "Hair stylist"
  else if (jobDescription.includes("librarian")) return "Librarian"
  else if (jobDescription.includes("social worker")) return "Social worker"
  else if (jobDescription.includes("pilot")) return "Pilot"
  else if (jobDescription.includes('gov.')) return "Gov. Employee"
  else if (jobDescription.includes('artist')) return "Artist"
  else if (jobDescription.includes('fashion designer')) return "Fashion Designer"
  else if (jobDescription.includes('photographer')) return "Photographer"
  else if (jobDescription.includes('economist')) return "Economist"
  else if (jobDescription.includes('professor')) return "Professor"
  else if (jobDescription.includes('pharmacist')) return "Pharmacist"
  else if (jobDescription.includes('student')) return "Student"
  else if (jobDescription.includes('choreographer')) return "Choreographer"
  else return "Other"
}



module.exports = new Userinfo()

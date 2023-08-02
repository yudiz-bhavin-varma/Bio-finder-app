const { status, jsonStatus, messages } = require('../../helper/api.responses')
const UserModel  = require('../user/model')
const UserInfoModel = require('../user-info/model')
class User {
  async get(req, res) {
    try {
      let allUsers = await UserModel.find({})
      return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: messages[req.userLanguage].success.replace('##', messages[req.userLanguage].cMatchLogs), data })
    } catch (error) {
      catchError('user.get', error, req, res)
    }
  }

  async formatAndInsert(req, res) {
    let users = await UserModel.find({}).sort({_id:-1}).skip(1000*26).limit(10000)
    let finaldataToPush = []
    for (let data of users) {
      let { name, age, gender, profile_fields, jobs, residence, hometown } = data.user
      let occupation = 'Other'
      let profileField = []
      for (let record of profile_fields) {
        if (record?.name === "Occupation") {
          let profession = record.display_value.toLowerCase()
          occupation = await assignProfession(profession)
        }
        profileField.push({
          sLableId: record.id,
          sLabelName: record.name,
          sDisplayText: record.display_value.replace(/(\r\n|\n|\r)/gm, "")
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
        aProfileFields:profileField,
        iUserId:data._id
      })
    }
    await UserInfoModel.insertMany(finaldataToPush)
    res.send({})
  }
}

function assignProfession(jobDescription) {
  if (jobDescription.includes("doctor")) return "Doctor"
  else if (jobDescription.includes("surgeon")) return "Doctor"
  else if (jobDescription.includes("qa")) return "QA"
  else if (jobDescription.includes("musician")) return "Musician"
  else if (jobDescription.includes("analytics")) return "Analyst"
  else if (jobDescription.includes("athlete")) return "Athlete"
  else if (jobDescription.includes("fashion designer")) return "Fashion Designer"
  else if (jobDescription.includes("photographer")) return "Photographer"
  else if (jobDescription.includes("engineer")) return "Enginner"
  else if (jobDescription.includes("manager")) return "Manager"
  else if (jobDescription.includes("consultant")) return "Consultant"
  else if (jobDescription.includes("professor")) return "Professor"  
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
  else if (jobDescription.includes("advocate")) return "Lawyer"
  else if (jobDescription.includes("chef")) return "Chef"
  else if (jobDescription.includes("cook")) return "Chef"
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



module.exports = new User()

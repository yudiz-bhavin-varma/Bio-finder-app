const { status, jsonStatus, messages } = require('../../helper/api.responses')
const { UserInfoModel } = require('../user-info/model')

class Userinfo {
  async get(req, res) {
    try {
      return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: messages[req.userLanguage].success.replace('##', messages[req.userLanguage].cMatchLogs), data })
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
        if (record.name === "Occupation") {
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
        name,
        age,
        gender,
        residence_city: residence?.city?.name || "",
        residence_state: residence?.region?.name || "",
        residence_country: residence?.country?.name || "",
        home_city: hometown?.city?.name || "",
        home_state: hometown?.region?.name || "",
        home_country: hometown?.country?.name || "",
        occupation,
        profileField
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

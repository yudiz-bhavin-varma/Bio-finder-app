const { status, jsonStatus, messages } = require('../../helper/api.responses')
const QuestionModel  = require('./model')
const {catchError,pick} = require('../../helper/utilities.services')
const mongoose = require('mongoose')
const objectId = mongoose.Types.objectId
class questionInfo {
  async get(req, res) {
    try {
      const { size, search, pageNumber} = pick(req.query, ['size', 'search', 'pageNumber'])
      const skip = parseInt(pageNumber - 1 || 0) * parseInt(size || 10)
      const limit = parseInt(size || 10)
      const condition = {'show':true }
      const projection = {'show':false}
      let [question,total] = await Promise.all([
        QuestionModel.find(condition,projection).sort({"bTopRated": 1 }).skip(skip).limit(limit),
        QuestionModel.countDocuments(condition,projection)
      ])      
      return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: messages[req.userLanguage].success.replace('##', messages[req.userLanguage].question), data:{question,total} })
    } catch (error) {
      catchError('questionInfo.get', error, req, res)
    }
  }

  async createSlug(req,res){
    try {
      let questions = [{
        "text" : "A review by a friend:",
        "show" : true,
        "categoryValue" : "144",
        "bTopRated" : true,
        "eProvider" : "bb",
        "slug" : "asbba"
      },
      
      {
        "text" : "Do you identify with a religion?",
        "show" : false,
        "categoryValue" : 5010,
        "eProvider" : "bb"
      },
      
      {
        "text" : "What is your height?",
        "show" : false,
        "categoryValue" : 5006,
        "eProvider" : "bb"
      },
      
      {
        "text" : "My mother would describe me as…",
        "show" : false,
        "categoryValue" : "10",
        "eProvider" : "bb"
      },
      
      {
        "text" : "Swipe right if...",
        "show" : true,
        "categoryValue" : "120",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "When no one's watching I...",
        "show" : true,
        "categoryValue" : "145",
        "eProvider" : "bb"
      },
      
      {
        "text" : "This summer, I'm looking for…",
        "show" : true,
        "categoryValue" : "167",
        "eProvider" : "bb"
      },
      
      {
        "text" : "My real-life superpower is…",
        "show" : true,
        "categoryValue" : "119",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "At half past nine in the morning in Germany I...",
        "show" : false,
        "categoryValue" : "162",
        "eProvider" : "bb"
      },
      
      {
        "text" : "After work you can find me…",
        "show" : true,
        "categoryValue" : "3",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "To me, Mallorca is...",
        "show" : false,
        "categoryValue" : "164",
        "eProvider" : "bb"
      },
      
      {
        "text" : "What are your ideal plans for children?",
        "show" : false,
        "categoryValue" : 5000,
        "eProvider" : "bb"
      },
      
      {
        "text" : "Ideal night out…",
        "show" : true,
        "categoryValue" : "35",
        "eProvider" : "bb"
      },
      
      {
        "text" : "Do you drink?",
        "show" : false,
        "categoryValue" : 5005,
        "eProvider" : "bb"
      },
      
      {
        "text" : "I quote too much from…",
        "show" : true,
        "categoryValue" : "30",
        "eProvider" : "bb"
      },
      
      {
        "text" : "If I could guest-star on a TV show, it'd be on…",
        "show" : false,
        "categoryValue" : "33",
        "eProvider" : "bb"
      },
      
      {
        "text" : "My most useless skill is…",
        "show" : true,
        "categoryValue" : "113",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "This summer, you'll find me…",
        "show" : true,
        "categoryValue" : "173",
        "eProvider" : "bb"
      },
      
      {
        "show" : false,
        "categoryValue" : 5003,
        "eProvider" : "bb"
      },
      
      {
        "text" : "About me",
        "show" : false,
        "categoryValue" : "aboutme_text",
        "eProvider" : "bb"
      },
      
      {
        "text" : "The world would be a better place with more…",
        "show" : true,
        "categoryValue" : "36",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "I'm hoping you…",
        "show" : true,
        "categoryValue" : "117",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "What's your zodiac sign?",
        "show" : false,
        "categoryValue" : 5004,
        "eProvider" : "bb"
      },
      
      {
        "text" : "Nightclub or Netflix...",
        "show" : true,
        "categoryValue" : "8",
        "eProvider" : "bb"
      },
      
      {
        "text" : "Two truths and a lie...",
        "show" : true,
        "categoryValue" : "38",
        "eProvider" : "bb"
      },
      
      {
        "text" : "Never have I ever…",
        "show" : true,
        "categoryValue" : "109",
        "eProvider" : "bb"
      },
      
      {
        "text" : "My personal hell is…",
        "show" : true,
        "categoryValue" : "143",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "If you could teleport to anywhere this weekend it would be…",
        "show" : false,
        "categoryValue" : "19",
        "eProvider" : "bb"
      },
      
      {
        "text" : "What's your education?",
        "show" : false,
        "categoryValue" : 5009,
        "eProvider" : "bb"
      },
      
      {
        "text" : "________ seeking ________.",
        "show" : true,
        "categoryValue" : "137",
        "eProvider" : "bb"
      },
      
      {
        "text" : "I guarantee you that…",
        "show" : true,
        "categoryValue" : "140",
        "eProvider" : "bb"
      },
      
      {
        "text" : "I'm a real nerd about...",
        "show" : true,
        "categoryValue" : "127",
        "eProvider" : "bb"
      },
      
      {
        "text" : "If I had three wishes, I'd wish for…",
        "show" : true,
        "categoryValue" : "17",
        "eProvider" : "bb"
      },
      
      {
        "text" : "The summer plan I'm most looking forward to is…",
        "show" : true,
        "categoryValue" : "168",
        "eProvider" : "bb"
      },
      
      {
        "text" : "A pro and a con of dating me...",
        "show" : true,
        "categoryValue" : "123",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "It's meant to be if...",
        "show" : true,
        "categoryValue" : "132",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "What do you want from your dates?",
        "show" : false,
        "categoryValue" : 5011,
        "eProvider" : "bb"
      },
      
      {
        "text" : "My perfect Sunday…",
        "show" : false,
        "categoryValue" : "20",
        "eProvider" : "bb"
      },
      
      {
        "text" : "If you laugh at this, we'll get along...",
        "show" : true,
        "categoryValue" : "129",
        "eProvider" : "bb"
      },
      
      {
        "text" : "Let's break dating stereotypes by…",
        "show" : true,
        "categoryValue" : "148",
        "eProvider" : "bb"
      },
      
      {
        "text" : "I promise I won't judge you if...",
        "show" : true,
        "categoryValue" : "142",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "A non-negotiable…",
        "show" : true,
        "categoryValue" : "138",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "My summer in three words:",
        "show" : true,
        "categoryValue" : "172",
        "eProvider" : "bb"
      },
      
      {
        "text" : "What are your political leanings?",
        "show" : false,
        "categoryValue" : 5001,
        "eProvider" : "bb"
      },
      
      {
        "text" : "Do you work out?",
        "show" : false,
        "categoryValue" : 5007,
        "eProvider" : "bb"
      },
      
      {
        "text" : "Go-to song is…",
        "show" : true,
        "categoryValue" : "32",
        "eProvider" : "bb"
      },
      
      {
        "text" : "If I could eat only one meal for the rest of my life it would be…",
        "show" : true,
        "categoryValue" : "22",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "Location",
        "show" : false,
        "categoryValue" : "location",
        "eProvider" : "bb"
      },
      
      {
        "text" : "If I could travel to any time in the past…",
        "show" : true,
        "categoryValue" : "118",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "If I could donate a million pounds, it'd be to…",
        "show" : false,
        "categoryValue" : "28",
        "eProvider" : "bb"
      },
      
      {
        "text" : "I'm known for...",
        "show" : true,
        "categoryValue" : "124",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "My summer obsession is…",
        "show" : true,
        "categoryValue" : "171",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "Do you smoke?",
        "show" : false,
        "categoryValue" : 5008,
        "eProvider" : "bb"
      },
      
      {
        "text" : "Occupation",
        "show" : false,
        "categoryValue" : "work",
        "eProvider" : "bb"
      },
      
      {
        "text" : "We'll get along if…",
        "show" : true,
        "categoryValue" : "25",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "Favorite quality in a person…",
        "show" : true,
        "categoryValue" : "34",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "My favourite way to spend a summer afternoon is…",
        "show" : true,
        "categoryValue" : "170",
        "eProvider" : "bb"
      },
      
      {
        "text" : "Perfect first date…",
        "show" : true,
        "categoryValue" : "15",
        "eProvider" : "bb"
      },
      
      {
        "text" : "I can't resist this dialect...",
        "show" : false,
        "categoryValue" : "165",
        "eProvider" : "bb"
      },
      
      {
        "text" : "I'm still not over...",
        "show" : true,
        "categoryValue" : "146",
        "eProvider" : "bb"
      },
      
      {
        "text" : "11:00pm at the Kiosk. I...",
        "show" : false,
        "categoryValue" : "161",
        "eProvider" : "bb"
      },
      
      {
        "text" : "I will never shut up about...",
        "show" : true,
        "categoryValue" : "116",
        "eProvider" : "bb"
      },
      
      {
        "text" : "My most “German” habit is...",
        "show" : false,
        "categoryValue" : "160",
        "eProvider" : "bb"
      },
      
      {
        "text" : "If you saw the targeted ads I get, you'd think I'm…",
        "show" : true,
        "categoryValue" : "141",
        "eProvider" : "bb"
      },
      
      {
        "text" : "At Oktoberfest, you'll find me...",
        "show" : false,
        "categoryValue" : "159",
        "eProvider" : "bb"
      },
      
      {
        "text" : "My 3rd grade teacher described me as…",
        "show" : true,
        "categoryValue" : "11",
        "eProvider" : "bb"
      },
      
      {
        "text" : "My summer motto is…",
        "show" : true,
        "categoryValue" : "169",
        "eProvider" : "bb"
      },
      
      {
        "text" : "Something I learned way later than I should have...",
        "show" : true,
        "categoryValue" : "126",
        "eProvider" : "bb"
      },
      
      {
        "text" : "As a child, I was really into...",
        "show" : true,
        "categoryValue" : "112",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "What makes a relationship great is...",
        "show" : true,
        "categoryValue" : "23",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "The quickest way to my heart is…",
        "show" : true,
        "categoryValue" : "110",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "If I were president…",
        "show" : true,
        "categoryValue" : "115",
        "eProvider" : "bb"
      },
      
      {
        "text" : "A fun fact I'm obsessed with...",
        "show" : true,
        "categoryValue" : "131",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "Education",
        "show" : false,
        "categoryValue" : "education",
        "eProvider" : "bb"
      },
      
      {
        "text" : "I'm a great +1 because...",
        "show" : true,
        "categoryValue" : "111",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "My song of the summer is…",
        "show" : false,
        "categoryValue" : "175",
        "eProvider" : "bb"
      },
      
      {
        "text" : "Beach or mountains…",
        "show" : false,
        "categoryValue" : "14",
        "eProvider" : "bb"
      },
      
      {
        "text" : "Childhood celebrity crush...",
        "show" : false,
        "categoryValue" : "1",
        "eProvider" : "bb"
      },
      
      {
        "text" : "My zombie apocalypse plan is...",
        "show" : true,
        "categoryValue" : "114",
        "bTopRated" : true,
        "eProvider" : "bb"
      },
      
      {
        "text" : "If I had an extra hour in the day I would…",
        "show" : true,
        "categoryValue" : "27",
        "eProvider" : "bb"
      },
      
      {
        "text" : "If I could have a superpower it'd be…",
        "show" : true,
        "categoryValue" : "13",
        "eProvider" : "bb"
      },
      
      {
        "text" : "I get way too excited about…",
        "show" : true,
        "categoryValue" : "139",
        "eProvider" : "bb"
      },
      
      {
        "text" : "Old dating traditions are out. My new tradition is…",
        "show" : true,
        "categoryValue" : "147",
        "eProvider" : "bb"
      }]
      // let question =  await QuestionModel.find({},{"__v":0 })
      console.log(questions)
      for(let rec of questions){
        if(rec.text){
          // let { text } = rec
          let slug = rec.text.toLowerCase()
          .replace(/ /g, "_")
          .replace(/[^\w-]+/g, "");
          let object = rec 
          object['slug'] = slug
          console.log(object)
          await QuestionModel.create([object])
          // await QuestionModel.deleteOne({"_id": objectId(rec._id) })
        }
      }
      res.send({})
    } catch (error) {
      catchError('questionInfo.createSlug', error, req, res)
    }
  }
}
module.exports = new questionInfo()

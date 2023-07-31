/* eslint-disable no-console */
const mongoose = require('mongoose')
const { UsersDBConnect } = require('../../database/mongoose')
const Schema = mongoose.Schema

const Userinfo = new Schema({
  sName: { type: String, trim: true, required: true },
  nAge: { type: Number, trim: true, required: true },
  sGender: { type: String, trim: true, required: true },
  residenceCity: { type: String, trim: true, required: true },
  residenceState: { type: String, trim: true, required: true },
  residenceCountry:{ type: String, trim: true, required: true },
  homeCity:{ type: String, trim: true, required: true },
  homeState:{ type: String, trim: true, required: true },
  homeCountry:{ type: String, trim: true, required: true },
  sOccupation: { type: String, trim: true, required: true },
  profileFields:[{
    lableId:{ type: String, trim: true, required: true },
    labelName:{ type: String, trim: true, required: true },
    displayText:{ type: String, trim: true, required: true },
  }]
}, { timestamps: { createdAt: 'dCreatedAt', updatedAt: 'dUpdatedAt' } })


const UserInfoModel = UsersDBConnect.model('userinfo', Userinfo)

UserInfoModel.syncIndexes().then(() => {
  console.log('Userinfo Model Indexes Synced')
}).catch((err) => {
  console.log('Userinfo Model Indexes Sync Error', err)
})
module.exports = UserInfoModel

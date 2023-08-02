/* eslint-disable no-console */
const mongoose = require('mongoose')
const { UsersDBConnect } = require('../../database/mongoose')
const Schema = mongoose.Schema

const Userinfo = new Schema({
  sName: { type: String, trim: true, required: true },
  nAge: { type: Number, trim: true, required: true },
  sGender: { type: String, trim: true, required: true },
  sResidenceCity: { type: String, trim: true },
  sResidenceState: { type: String, trim: true },
  sResidenceCountry:{ type: String, trim: true },
  sHomeCity:{ type: String, trim: true },
  sHomeState:{ type: String, trim: true },
  sHomeCountry:{ type: String, trim: true },
  sOccupation: { type: String, trim: true },
  aProfileFields:[{
    sLableId:{ type: String, trim: true },
    sLabelName:{ type: String, trim: true },
    sDisplayText:{ type: String, trim: true },
  }],
  iUserId: { type:mongoose.Types.ObjectId,unique:true }
}, { timestamps: { createdAt: 'dCreatedAt', updatedAt: 'dUpdatedAt' } })


const UserInfoModel = UsersDBConnect.model('userinfo', Userinfo)

UserInfoModel.syncIndexes().then(() => {
  console.log('Userinfo Model Indexes Synced')
}).catch((err) => {
  console.log('Userinfo Model Indexes Sync Error', err)
})
module.exports = UserInfoModel

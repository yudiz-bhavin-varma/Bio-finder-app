/* eslint-disable no-console */
const mongoose = require('mongoose')
const { UsersDBConnect } = require('../../database/mongoose')
const Schema = mongoose.Schema

// change naming convention like sText as per the type in v2 version of api
const User = new Schema({
  user:{
  user_id : { type: String, trim: true, required: true },
  projection:[],
  client_source: { type: String, trim: true, required: true },
  name:{ type: String, trim: true, required: true },
  age:{ type: Number, trim: true, required: true },
  gender:{ type: Number, trim: true, required: true },
  verification_status : { type: Number, trim: true, required: true },
  profile_fields:[{
    $gpb:{ type: String, trim: true, required: true },
    id:{ type: String, trim: true, required: true },
    type:{ type: Number, trim: true, required: true },
    name:{ type: String, trim: true, required: true },
    display_value: { type: String, trim: true, required: true }
  }],
  residence:{
    $gpb:{ type: String, trim: true },
    type:{ type: Number, trim: true },
    country:{
      $gpb:{ type: String, trim: true },
      id:{ type: Number, trim: true },
      name:{ type: String, trim: true },
      phone_prefix:{},
      iso_code:{},
      flag_symbol:{},
    },
    region:{
      $gpb:{ type: String, trim: true },
      id:{ type: Number, trim: true },
      name:{ type: String, trim: true },
      abbreviation:{ type: String, trim: true },
    },
    city : {
        $gpb:{ type: String, trim: true },
        id:{ type: Number, trim: true },
        name:{ type: String, trim: true },
				context_info :{ type: String, trim: true },
			}
  },
  hometown:{
    $gpb:{ type: String, trim: true },
    type:{ type: Number, trim: true },
    country:{
      $gpb:{ type: String, trim: true },
      id:{ type: Number, trim: true },
      name:{ type: String, trim: true },
      phone_prefix:{},
      iso_code:{},
      flag_symbol:{},
    },
    region:{
      $gpb:{ type: String, trim: true },
      id:{ type: Number, trim: true },
      name:{ type: String, trim: true },
      abbreviation:{ type: String, trim: true },
    },
    city : {
        $gpb:{ type: String, trim: true },
        id:{ type: Number, trim: true },
        name:{ type: String, trim: true },
				context_info :{ type: String, trim: true },
			}
  },
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
  }
}, { timestamps: { createdAt: 'dCreatedAt', updatedAt: 'dUpdatedAt' } })


const UserModel = UsersDBConnect.model('user', User)

UserModel.syncIndexes().then(() => {
  console.log('User Model Indexes Synced')
}).catch((err) => {
  console.log('User Model Indexes Sync Error', err)
})
module.exports = UserModel

/* eslint-disable no-console */
const { UsersDBConnect } = require('../../database/mongoose')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { status } = require('../../data')


const occupation = new Schema({
  sName: { type: String, trim: true, required: true, unique:true },
  eStatus:{type: String, enum:status }
}, { timestamps: { createdAt: 'dCreatedAt', updatedAt: 'dUpdatedAt' } })


const occupationModel = UsersDBConnect.model('occupation', occupation)

occupationModel.syncIndexes().then(() => {
  console.log('occupation Model Indexes Synced')
}).catch((err) => {
  console.log('occupation Model Indexes Sync Error', err)
})
module.exports = occupationModel

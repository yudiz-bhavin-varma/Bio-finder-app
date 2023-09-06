/* eslint-disable no-console */
const mongoose = require('mongoose')
const { UsersDBConnect } = require('../../database/mongoose')
const Schema = mongoose.Schema

// question change naming convention like sText as per the type in v2 version of api
const Question = new Schema({
  text: { type: String, trim: true, required: true },
  slug: { type: String, trim: true, required: true },
  show: { type: Boolean, trim: true, required: true },
  categoryValue: { type: String, trim: true, required: true },
  bTopRated:{ type: Boolean, trim: true, required: true }
}, { timestamps: { createdAt: 'dCreatedAt', updatedAt: 'dUpdatedAt' } })


const QuestionModel = UsersDBConnect.model('question', Question)

QuestionModel.syncIndexes().then(() => {
  console.log('Question Model Indexes Synced')
}).catch((err) => {
  console.log('Question Model Indexes Sync Error', err)
})
module.exports = QuestionModel

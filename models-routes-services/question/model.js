/* eslint-disable no-console */
const mongoose = require('mongoose')
const { UsersDBConnect } = require('../../database/mongoose')
const Schema = mongoose.Schema

const Question = new Schema({
  text: { type: String, trim: true, required: true },
  show: { type: Boolean, trim: true, required: true },
  categoryValue: { type: String, trim: true, required: true },
}, { timestamps: { createdAt: 'dCreatedAt', updatedAt: 'dUpdatedAt' } })


const QuestionModel = UsersDBConnect.model('question', Question)

QuestionModel.syncIndexes().then(() => {
  console.log('Question Model Indexes Synced')
}).catch((err) => {
  console.log('Question Model Indexes Sync Error', err)
})
module.exports = QuestionModel

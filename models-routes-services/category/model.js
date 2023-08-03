/* eslint-disable no-console */
const mongoose = require('mongoose')
const { UsersDBConnect } = require('../../database/mongoose')
const Schema = mongoose.Schema

const Category = new Schema({
  text: { type: String, trim: true, required: true },
  show: { type: Boolean, trim: true, required: true },
  categoryValue: { type: String, trim: true, required: true },
}, { timestamps: { createdAt: 'dCreatedAt', updatedAt: 'dUpdatedAt' } })


const CategoryModel = UsersDBConnect.model('category', Category)

CategoryModel.syncIndexes().then(() => {
  console.log('Category Model Indexes Synced')
}).catch((err) => {
  console.log('Category Model Indexes Sync Error', err)
})
module.exports = CategoryModel

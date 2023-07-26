/* eslint-disable no-console */
const { UsersDBConnect } = require('../../database/mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  sName: { type: String, trim: true, required: true }
}, { timestamps: { createdAt: 'dCreatedAt', updatedAt: 'dUpdatedAt' } })


const UserModel = UsersDBConnect.model('users', User)

UserModel.syncIndexes().then(() => {
  console.log('Admin Model Indexes Synced')
}).catch((err) => {
  console.log('Admin Model Indexes Sync Error', err)
})
module.exports = UserModel

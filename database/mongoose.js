const mongoose = require('mongoose')
const { handleCatchError } = require('../helper/utilities.services')

const config = require('../config/config')

const UsersDBConnect = connection(config.DB_URL, 'Users')

function connection(DB_URL, DB) {
  try {
    const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true, readPreference: 'secondaryPreferred' }
    const conn = mongoose.createConnection(DB_URL, dbConfig)
    conn.on('connected', () => console.log(`Connected to ${DB} database...`))
    return conn
  } catch (error) {
    handleCatchError(error)
  }
}

module.exports = {
  UsersDBConnect
}

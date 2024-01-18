const mongoose = require('mongoose')
require('dotenv').config()

const connectDataBase = async () => {
  try {
    const atlasConnectionURL = process.env.DB_CONNECTION_STRING
    await mongoose.connect(atlasConnectionURL)
  }
  catch (error) {
    console.log(error.message)
  }
}

module.exports = connectDataBase
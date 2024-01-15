const mongoose = require('mongoose')

const connectDataBase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/PokemonDb')
  }
  catch (error) {
    console.log(error.message)
  }
}

module.exports = connectDataBase
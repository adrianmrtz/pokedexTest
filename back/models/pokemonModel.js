const mongoose = require('mongoose')

const PokemonSchema = new mongoose.Schema({
  name: String,
  types: [String],
})

const Pokemon = mongoose.model('Pokemon', PokemonSchema)

module.exports = Pokemon
const express = require('express')
const router = express.Router()
const pokedexController = require('../controllers/pokedexController')

router.get('/getpokemons', pokedexController.getPokemons)
router.get('/getpokemoninfo/:name', pokedexController.getPokemonInfoByName)

module.exports = router
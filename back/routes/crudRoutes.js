const express = require('express')
const router = express.Router()
const crudController = require('../controllers/crudController')

router.get('/getallpokemons', crudController.getAllPokemons)
router.post('/insertpokemon', crudController.createPokemon)
router.get('/getpokemonbyid/:id', crudController.getPokemonById)
router.put('/updatepokemon:id', crudController.updatePokemon)
router.delete('/deletepokemon:id', crudController.deletePokemon)

module.exports = router
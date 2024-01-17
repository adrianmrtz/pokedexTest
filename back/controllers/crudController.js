const Pokemon = require('../models/pokemonModel')
const mongoose = require('mongoose')

const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons)
  }
  catch (error) {
    res.status(500).json({error: error.message})
  }
};

const createPokemon = async (req, res) => {
  const { name, types } = req.body

  try {
    const newPokemon = new Pokemon({ name, types })
    await newPokemon.save()
    res.status(201).json(newPokemon)
  }
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getPokemonById = async (req, res) => {
  const id = req.params.id

  try {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    const pokemon = await Pokemon.findById(id)
    if (pokemon) {
      res.status(200).json(pokemon)
    }
    else {
      res.status(404).json({error: 'Pokemon not found'})
    }
  }
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

const updatePokemon = async (req, res) => {
  const id = req.params.id
  const updatedPokemon = req.body

  try {
    const pokemon = await Pokemon.findByIdAndUpdate(id, updatedPokemon, {new: true})
    if (pokemon) {
      res.status(200).json(pokemon)
    }
    else {
      res.status(404).json({error: 'Pokemon not found'})
    }
  }
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

const deletePokemon = async (req, res) => {
  const id = req.params.id

  try {
    const pokemon = await Pokemon.findByIdAndDelete(id)
    if (pokemon) {
      res.status(200).json(pokemon)
    }
    else {
      res.status(404).json({error: 'Pokemon not found'})
    }
  }
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = {
  getAllPokemons,
  createPokemon,
  getPokemonById,
  updatePokemon,
  deletePokemon,
}
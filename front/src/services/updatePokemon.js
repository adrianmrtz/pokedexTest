import axios from 'axios'
import { baseRoute } from './apiConfig'

export async function updatePokemon(id, updatedPokemon) {
  const response = await axios.put(`${baseRoute}/updatepokemon/${id}`, updatedPokemon)

  return response
}
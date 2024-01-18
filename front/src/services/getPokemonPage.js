import axios from "axios";
import { baseRoute } from "./apiConfig";

export async function getPokemonPage(limit, page, search) {
  try {
    if (search !== null) {
      const response = await axios.get(`${baseRoute}/pokedex/getpokemons?limit=${limit}&page=${page}&search=${search}`)

      return response
    }
    
    const response = await axios.get(`${baseRoute}/pokedex/getpokemons?limit=${limit}&page=${page}`)

    return response
  } catch (error) {
    return error.response
  }
}
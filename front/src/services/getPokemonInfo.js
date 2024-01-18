import axios from "axios";
import { baseRoute } from "./apiConfig";

export async function getPokemonInfo(name) {
  try {
    const response = await axios.get(`${baseRoute}/pokedex/getpokemoninfo/${name}`)

    return response.data
  } catch (error) {
    console.log(error)
  }
}
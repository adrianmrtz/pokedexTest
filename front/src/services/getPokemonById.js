import axios from "axios";
import { baseRoute } from "./apiConfig";

export async function getPokemonById(id) {
  const response = await axios.get(`${baseRoute}/getpokemonbyid/${id}`)

  return response
}
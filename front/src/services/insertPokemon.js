import axios from "axios";
import { baseRoute } from "./apiConfig";

export async function insertPokemon(newPokemon) {
  const response = await axios.post(`${baseRoute}/insertpokemon`, newPokemon)

  return response
}
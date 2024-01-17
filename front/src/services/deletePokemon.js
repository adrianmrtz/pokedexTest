import axios from "axios";
import { baseRoute } from "./apiConfig";

export async function deletePokemon(id) {
  const response = await axios.delete(`${baseRoute}/deletepokemon/${id}`)

  return response
}
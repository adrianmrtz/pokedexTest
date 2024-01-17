import axios from "axios"
import { baseRoute } from "./apiConfig"

export async function getAllPokemons() {
  const response = await axios.get(`${baseRoute}/getallpokemons`)

  return response.data
}
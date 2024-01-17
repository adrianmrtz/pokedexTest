import { useState } from "react";
import { AllPokemons } from "./AllPokemons";
import { PokemonForm } from "./PokemonForm";

export function Crud() {
  const [allPokemons, setAllPokemons] = useState(null)

  return (
    <div className="container-fluid">
      <PokemonForm allPokemons={allPokemons} setAllPokemons={setAllPokemons}/>
      <AllPokemons allPokemons={allPokemons} setAllPokemons={setAllPokemons}/>
    </div>
  )
}
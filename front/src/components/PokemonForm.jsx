import { useState } from "react"
import { toast } from "react-toastify"
import { SelectTipo } from "./SelectTipo"
import { insertPokemon } from "../services/insertPokemon"

export function PokemonForm({allPokemons, setAllPokemons}) {
  const [hasSecondaryType, setHasSecondaryType] = useState(false)

  const toggleHasSecondaryType = (event) => {
    event.preventDefault()

    setHasSecondaryType(prevState => {
      return !prevState
    })
  }

  const handleAddPokemonSubmit = (event) => {
    event.preventDefault()
    const data = event.target.elements
    
    if (data.name.value.trim() === "") {
      document.querySelector('#pokemonAddForm').classList.add('shake')
      setTimeout(() => {
        document.querySelector('#pokemonAddForm').classList.remove('shake')
      }, 500)

      return null
    }

    const newPokemon = {
      name: data.name.value.trim(),
      types: [data.type1.value],
    }

    if (hasSecondaryType) newPokemon.types.push(data.type2.value)

    insertPokemon(newPokemon).then(response => {
      if (response.status === 201) {
        setAllPokemons(prevState => {
          return [...prevState, response.data]
        })

        toast("Pokémon agregado correctamente.")
      }
    }).catch(error => {
      toast.error("Error al agregar Pokémon.")
      console.log(error)
    })
  }

  return (
    <div className="row">
        <div className="col-lg-5 mx-auto my-3">
          <div className="card card-body border-primary" id="pokemonAddForm">
            <form onSubmit={handleAddPokemonSubmit}>
              <h3>Agrega un Pokémon</h3>
              <label htmlFor="name">Nombre</label>
              <input type="text" className="form-control" placeholder="Nombre" name="name" id="name"/>
              
              <div className="row mt-3">
                <label htmlFor="type-1">Tipos</label>

                <div className="col-lg-6">
                  <SelectTipo name="type-1" id="type1"/>
                </div>

                <div className="col-lg-6">
                  {hasSecondaryType && <SelectTipo name="type2" id="type-2"/>}

                  <button className="btn btn-link" onClick={toggleHasSecondaryType}>
                    {hasSecondaryType ? 'Cancelar' : 'Agregar'} tipo secundario
                  </button>
                </div>
              </div>
              
              <button type="submit" className="btn btn-secondary mt-4 w-100">Agregar</button>
            </form>
          </div>
        </div>

    </div>

    
  )
}
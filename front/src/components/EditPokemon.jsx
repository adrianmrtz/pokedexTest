import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Spinner } from "./Spinner"
import { SelectTipo } from "./SelectTipo"
import { getPokemonById } from "../services/getPokemonById"
import { useNavigate } from "react-router-dom"
import { updatePokemon } from "../services/updatePokemon"
import { toast } from "react-toastify"

export function EditPokemon() {
  const navigate = useNavigate()
  const { pokemonId } = useParams()

  const [editingPokemon, setEditingPokemon] = useState(null)
  const [hasSecondaryType, setHasSecondaryType] = useState(false)

  useEffect(() => {
    getPokemonById(pokemonId).then(response => {
      if(response.status === 200) {
        setEditingPokemon(response.data)
      }
    }).catch(error => {
      console.log(error)
      navigate('/crud')
    })
  }, [])

  useEffect(() => {
    if(editingPokemon){
      setHasSecondaryType(editingPokemon.types.length > 1);
    }
  }, [editingPokemon])


  const toggleHasSecondaryType = (event) => {
    event.preventDefault()

    setHasSecondaryType(prevState => {
      return !prevState
    })
  }

  const handleEditPokemonSubmit = (event) => {
    event.preventDefault()
    const data = event.target.elements
    
    if (data.name.value.trim() === "") {
      document.querySelector('#pokemonAddForm').classList.add('shake')
      setTimeout(() => {
        document.querySelector('#pokemonAddForm').classList.remove('shake')
      }, 500)

      return null
    }

    const updatedPokemon = {
      name: data.name.value.trim(),
      types: [data.type1.value],
    }

    if (hasSecondaryType) updatedPokemon.types.push(data.type2.value)

    updatePokemon(pokemonId, updatedPokemon).then(response => {
      if (response.status === 200) {
        toast("Pokémon actualizado correctamente.")
        navigate('/crud')
      }
    }).catch(error => {
      toast.error("Error al actualizar Pokémon.")
      console.log(error)
    })
  }
  
  if (editingPokemon === null) return <Spinner />

  return (
    <div className="row">
        <div className="col-lg-5 mx-auto my-3">
          <div className="card card-body border-primary" id="pokemonAddForm">
            <form onSubmit={handleEditPokemonSubmit}>
              <h3>Edita tu Pokémon</h3>
              <label htmlFor="name">Nombre</label>
              <input type="text" className="form-control" placeholder="Nombre" name="name" id="name" defaultValue={editingPokemon.name}/>
              
              <div className="row mt-3">
                <label htmlFor="type-1">Tipos</label>

                <div className="col-lg-6">
                  <SelectTipo name="type-1" id="type1" selectedType={editingPokemon.types[0]}/>
                </div>

                <div className="col-lg-6">
                  {hasSecondaryType && <SelectTipo name="type2" id="type-2" selectedType={editingPokemon.types[1]}/>}

                  <button className="btn btn-link" onClick={toggleHasSecondaryType}>
                    {hasSecondaryType ? 'Cancelar' : 'Agregar'} tipo secundario
                  </button>
                </div>
              </div>
              
              <button type="submit" className="btn btn-secondary mt-4 w-100">Editar</button>
            </form>
          </div>
        </div>
    </div>
  )
}
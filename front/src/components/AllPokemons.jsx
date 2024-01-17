import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getAllPokemons } from "../services/getAllPokemons"
import { deletePokemon } from "../services/deletePokemon"
import { types } from "./types"
import { Spinner } from "./Spinner"

export function AllPokemons({allPokemons, setAllPokemons}) {
  const navigate = useNavigate()

  useEffect(() => {
    getAllPokemons().then(pokemons => {
      setAllPokemons(pokemons)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  const handleDeletePokemon = (id) => {
    deletePokemon(id).then(response => {
      if(response.status === 200){
        document.querySelector(`#a${id}`).classList.add('fade-out')

        setTimeout(() => {
          setAllPokemons(prevState => {
            return prevState.filter(pokemon => pokemon._id !== id)
          })
        }, 500)

        toast("Pokémon eliminado correctamente.")
      }
    }).catch(error => {
      console.log(error)
      toast.error("Error al eliminar Pokémon.")
    })
  }

  if(allPokemons === null) return <Spinner />

  return (
    <div className="row">
      <div className="col-lg-8 mx-auto mt-3">
        <div className="row">
          <h3>Pokémon guardados</h3>
        {
          allPokemons.map(pokemon => (
            <div className="col-md-3 col-6 col-lg-3 col-sm-6 my-2 g-3" key={pokemon._id} id={`a${pokemon._id}`}>
                <div className="card card-body border-secondary">
                  <h4>{ pokemon.name }</h4>
                  
                  {
                    pokemon.types.map(type => (
                      <span className="badge my-1" key={ `${pokemon._id}-${type}` } style={{ backgroundColor:types[type]}}>
                        <h5>{ type }</h5>
                      </span>
                    ))
                  }

                  <div className="input-group">
                    <button className="btn btn-outline-secondary" type="button" onClick={() => navigate(`/crud/edit/${pokemon._id}`)}>Editar</button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDeletePokemon(pokemon._id)}>Eliminar</button>
                  </div>
                </div>
            </div>
          ))
        }
        </div>
        
      </div>
    </div>
    
  )
  
}
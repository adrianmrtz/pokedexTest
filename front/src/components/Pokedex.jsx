import { useState, useEffect, useRef } from "react";
import { PokeCard } from "./PokeCard";
import { Spinner } from "./Spinner";
import { getPokemonPage } from "../services/getPokemonPage";
import { getPokemonInfo } from "../services/getPokemonInfo";

export function Pokedex() {
  const [pokedex, setPokedex] = useState([])
  const [limitReached, setLimitReached] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState(null)
  const limit = 8
  const prevPageRef = useRef(page);

  const getPokemonsPageInfo = () => {
    if ((prevPageRef.current !== page || page === 1) && !limitReached) {
      getPokemonPage(limit, page, search).then((response) => {

        if (response.status === 406) {
          return setLimitReached(true)
        }

        const promises = response.data.map((pokemon) => getPokemonInfo(pokemon.name))
        Promise.all(promises).then((pokemons) => {
          setPokedex((pokedex) => [...pokedex, ...pokemons])
        })

        if(response.data.length < 8) {
          return setLimitReached(true)
        }
      })
      
      prevPageRef.current = page;
    }
  }

  useEffect(() => {
    getPokemonsPageInfo()
  }, [page, limitReached, search])

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition >= documentHeight - windowHeight - 50) {
      if(!limitReached){
        setPage((prevPage) => prevPage + 1);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    const searchValue = event.target.elements.search.value.trim()

      setSearch(searchValue === "" ? null : searchValue)
      setPokedex([])
      setPage(1)
      setLimitReached(false)
      prevPageRef.current = 1

      setTimeout(() => {
        if(searchValue === "") getPokemonsPageInfo()
      })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        

        <div className="col-lg-8 mx-auto">
          <h1 className="my-3">POKÉDEX</h1>

          <div className="row">
            <div className="col-lg-6">
                <div className="card card-body border-light">

                  <form onSubmit={handleSearchSubmit}>
                    <h3>Buscar</h3>
                    <label htmlFor="search">Búsqueda</label>
                    <input type="text" className="form-control" id="search" name="search" placeholder="Búsqueda"/>
                    <button type="submit" className="btn btn-primary mt-3">Buscar</button>
                  </form>

                </div>
            </div>
          </div>

          {
            limitReached && pokedex.length === 0 ? <h5 className="mt-5 text-center">No se encontraron resultados con tu búsqueda.</h5>
            : (
              
              <div className="row mt-5">
              {
                pokedex.map(poke => (
                  <div key={poke.id} className="col-md-4 col-lg-6 col-xl-3 my-auto p-3">
                    <PokeCard poke={poke} />
                  </div>
                ))
              }
            </div>
              
            )
          }

        </div>
        {!limitReached && <Spinner />}
      </div>
    </div>
  )
}
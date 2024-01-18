const axios = require('axios')

const pokeApiBaseRoute = 'https://pokeapi.co/api/v2/pokemon/'

const getPokemons = async (req, res) => {
  try {
    const { limit, page, search } = req.query

    const response = await axios.get(`${pokeApiBaseRoute}?limit=1302`)
    const sortedPokemons = response.data.results.sort((a, b) => a.name.localeCompare(b.name))

    const totalPokemons = search !== undefined
          ? sortedPokemons.filter(pokemon => pokemon.name.includes(search.toLowerCase()))
          : sortedPokemons

    //Pagination if there is correct limit and page
    if (limit !== undefined && page !== undefined) {
      if (!isNaN(limit) && !isNaN(page) && parseInt(limit) >= 8 && parseInt(page) > 0) {
        const parsedLimit = parseInt(limit)
        const parsedPage = parseInt(page)

        const total = totalPokemons.length

        if ((parsedLimit * parsedPage) <= Math.ceil(total / parsedLimit) *  parsedLimit) {
          const pageStart = (parsedLimit * parsedPage) - parsedLimit
          const pageOfPokemons = totalPokemons.slice(pageStart, pageStart + parsedLimit)

          return res.status(200).json(pageOfPokemons)
        }
        else {
          return res.status(406).json({error: 'Non-pageable data.'})
        }

      }
      else {
        return res.status(400).json({ error: 'Invalid limit or page.' });
      }
    }


    return res.status(200).json(totalPokemons)
  }
  catch(error) {
    console.log(error)
    res.status(500).json({error})
  }
}

const getPokemonInfoByName = async (req, res) => {
  const pokemonName = req.params.name

  try {
    const response = await axios.get(`${pokeApiBaseRoute}${pokemonName}`)

    return res.status(200).json(response.data)
  }
  catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
}

module.exports = {
  getPokemons,
  getPokemonInfoByName,
}
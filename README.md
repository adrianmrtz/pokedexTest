# Pokedex FullStack Test

## Links

- **Page:** https://test-pokedex-adrianmrtz.onrender.com/crud
- **API:** https://pokedex-test-api.onrender.com/

*Note: The API service may be somewhat slow due to the capacity of the free server on which it is hosted; this can also be seen on the page.*

## Functionality

The page is divided into two sections: CRUD and Pokédex, which can be accessed through the navigation bar.

### CRUD

- Options to Create, Read, Update, and Delete Pokémon from a MongoDB database called PokemonDB.
- The Pokémon model used in this exercise has the following structure:
```json
{
"_id": ObjectId("65a58e7b0471e06ebcc0f96d"),
"name": "Charizard",
"types": [ "fire", "flying" ],
"__v": 0
}
```

- When adding a new Pokémon, the user provides its name, primary type, and has the option to add a secondary type.

### Pokédex
- Displays all Pokémon from the PokeAPI v2, sorted alphabetically.
- Pagination is done using infinite scrolling (loading pages as the user scrolls).
- Searching with the `search` parameter in the API is done through a form, and the results are paginated the same way as without searching.
- If the search is empty, the Pokémon are reset.
- Each Pokémon card has a "PDF" button that generates a PDF with the Pokémon's basic information.

### API Endpoints

#### CRUD
- Get all Pokémon stored in the database: `GET /getallpokemons`
- Insert a new Pokémon: `POST /insertpokemon`
- Get a Pokémon by ID: `GET /getpokemonbyid/:id`
- Update a Pokémon by ID: `PUT /updatepokemon/:id`
- Delete a Pokémon by ID: `DELETE /deletepokemon/:id`

#### Pokedex
- Get Pokémon from the PokeAPI v2 (with pagination): `GET /pokedex/getpokemons`
- Without parameters, it returns all Pokémon sorted alphabetically.
- With the `search` parameter, it returns Pokémon whose name contains the letters of `search`.
- With the `limit` and `page` parameters, it returns a `page` of size `limit`.
- Get detailed information about a Pokémon by name: `GET /pokedex/getpokemoninfo/:name`

---

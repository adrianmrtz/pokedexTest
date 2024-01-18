# Pokedex FullStack Test Filup

## Candidato
**Nombre:** Jesus Adrian Martinez Aispuro  
**Teléfono:** 6531055636

## Enlaces

- **Página:** [Pokedex FullStack Test](https://test-pokedex-adrianmrtz.onrender.com/crud)
- **API:** [Pokedex API](https://pokedex-test-api.onrender.com/)

*Nota: El servicio de la API puede estar algo lento debido a la capacidad del servidor gratuito en el que está hosteado, esto también se puede ver reflejado en la página.*

## Funcionalidad

La página está dividida en dos secciones: CRUD y Pokédex, a las cuales se puede acceder a través de la barra de navegación.

### CRUD

- Opciones de Crear, Leer, Actualizar y Borrar pokémons de una base de datos en MongoDB llamada PokemonDB.
- El modelo de Pokemon usado en este ejercicio tiene la siguiente estructura:
   ```json
   {
       "_id": ObjectId("65a58e7b0471e06ebcc0f96d"),
       "name": "Charizard",
       "types": [ "fire", "flying" ],
       "__v": 0
   }
   ```
   
-Al agregar un Pokémon nuevo el usuario proporciona su nombre, tipo principal y tiene la opción de agregar un tipo secundario.

### Pokédex
- Muestra todos los Pokémon provenientes de la pokeapi v2, ordenados alfabéticamente.
- La paginación se realiza mediante scroll infinito (cargando páginas a medida que el usuario baja).
- Búsqueda con el parámetro `search` en la API, la cual se realiza mediante un formulario y los resultados se paginan de la misma manera que sin búsqueda.
- Si la búsqueda está vacía, se reinician los pokémons.
- Cada tarjeta de Pokémon tiene un botón "PDF" que genera un PDF con la información básica del Pokémon.

### Endpoints de la API

#### CRUD
- Obtener todos los Pokémon guardados en la base de datos: `GET /getallpokemons`
- Insertar un Pokémon nuevo: `POST /insertpokemon`
- Obtener un Pokémon por ID: `GET /getpokemonbyid/:id`
- Actualizar un Pokémon por ID: `PUT /updatepokemon/:id`
- Borrar un Pokémon por ID: `DELETE /deletepokemon/:id`

#### Pokédex
- Obtener Pokémon de la pokeapi v2 (con paginación): `GET /pokedex/getpokemons`
  - Sin parámetros devuelve todos los Pokémon ordenados alfabéticamente.
  - Con parámetro `search` devuelve Pokémon cuyo nombre contiene las letras de `search`.
  - Con parámetros `limit` y `page` devuelve la página `page` de tamaño `limit`.
- Obtener información detallada de un Pokémon por nombre: `GET /pokedex/getpokemoninfo/:name`

---

*¡Gracias por revisar mi prueba técnica!*

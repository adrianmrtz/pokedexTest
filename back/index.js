const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const crudRoutes = require('./routes/crudRoutes')
const pokedexRoutes = require('./routes/pokedexRoutes')
const connectDataBase = require('./config/database')
const job = require('./cron')

const app = express()
const port = 3000

job.start()

app.use(bodyParser.json())

app.use(cors())

connectDataBase()

app.use('/', crudRoutes)
app.use('/pokedex', pokedexRoutes)

app.listen(port, () => {
 console.log(`Server started at http://localhost:${port}` )
})
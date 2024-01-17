const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const crudRoutes = require('./routes/crudRoutes')
const connectDataBase = require('./config/database')

const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(cors())

connectDataBase()

app.use('/', crudRoutes)

app.listen(port, () => {
 console.log(`Server started at http://localhost:${port}` )
})
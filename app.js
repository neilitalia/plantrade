const express = require('express')
const cors = require('cors')
// const helmet = require("helmet");
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const AppRouter = require('./routes/AppRouter')

const app = express()

const PORT = process.env.PORT || 3001

// app.use(helmet())
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', AppRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/dist/index.html`))
  })
}

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))
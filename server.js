const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const items = require('./routes/api/items')

const App = express()

// Bodyparser Middleware
App.use(bodyParser.json())

// DB Config
const db = require('./config/keys').mongoURI

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(" MongoDB Connected..."))
    .catch(err => console.log(" Err ", err))

// Use Routes
App.use('/api/items', items)

const port = process.env.PORT || 5000

App.listen(port, () => console.log(`Server started on port ${port}`))
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path - require('path')

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

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    App.use(express.static('client/build'))

    App.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

App.listen(port, () => console.log(`Server started on port ${port}`))
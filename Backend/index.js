require('dotenv').config()
// Body-parser parses is an HTTP request body
const bodyParser = require('body-parser');
const cors = require('cors');
// importing connectToMongo method from './db'
const connectToMongo = require('./db');
connectToMongo();
// importing express 
const express = require('express');
const app = express()
const port = 5000

// for using json in body we want to write this
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

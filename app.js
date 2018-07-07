// ==========| GLOBAL VARIABLES & SETUP |============

const express    = require('express');
const bodyParser = require('body-parser');
const axios      = require('axios');

const config     = require('./config.js') // API Keys and Id's
const app        = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

// ==========| ROUTES |============

app.get('/', function(req, res) {
  console.log(config.AUTH_TOKEN);
  res.send('this works' + config.AUTH_TOKEN);
})

// ==========| LISTEN ON PORT 3000 |============
app.listen(3000, () => console.log('Example app listening on port 3000!'))

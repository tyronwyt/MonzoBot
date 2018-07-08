// ==========| GLOBAL VARIABLES & SETUP |============
const https 	 = require('https');
const fs	 = require('fs');
const express    = require('express');
const bodyParser = require('body-parser');
const axios      = require('axios');
const serveIndex = require('serve-index');
const config     = require('./config.js') // API Keys and Id's

const options = {
      key: fs.readFileSync('../ssl/privatekey.pem'),
      cert: fs.readFileSync('../ssl/server.crt'),
      requestCert: false,
      rejectUnauthorized: false
};

const app        = express()


app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

app.use('/.well-known', express.static('.well-known'), serveIndex('.well-known'));

// ==========| ROUTES |============

app.get('/', function(req, res) {
  console.log(config.AUTH_TOKEN);
  res.send('this works' + config.AUTH_TOKEN);
})

app.post('/new-transaction', function(req, res) {
  const transaction = req.body;  

  axios.post( 'https://api.telegram.org/bot581596811:AAHvgaQm2ulrj1Ox6Yn_ssu0Mfzd7yYWxhM/sendMessage', {
      chat_id: config.CHAT_ID,
      text: transaction.data.amount + ' ' + transaction.data.currency + '\n' +
      transaction.data.merchant.name + '\n' +
      transaction.data.merchant.category
      })
  .then(response => {
	  // We get here if the message was successfully posted
	  console.log('Message posted')
	  res.end('ok')
  })
  .catch(err => {
	  // ...and here if it was not
	  console.log('Error :', err)
	  res.end('Error :' + err)
  })
})


// ==========| LISTEN ON PORT 3000 |============

var server = https.createServer(options, app).listen(3000, function(){
	console.log('server started at port 3000');
});


//app.listen(3000, () => console.log('Example app listening on port 3000!'))

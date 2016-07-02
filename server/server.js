var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
  res.header('Access-Control-Expose-Headers', 'token');

  next();
});

app.use(express.static( __dirname + './../client' ));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use(bodyParser.json());

var port = process.env.PORT || 8000;

app.listen(port);

console.log('Listening on port ' + port);

module.exports = app;
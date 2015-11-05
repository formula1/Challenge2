var express = require('express');
var path = require('path');
var app = express();
var simpleRouter = require('./simple-router');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})
  .use('/angular', simpleRouter(path.resolve(__dirname, '..', 'examples/angular')))
  .use('/react', simpleRouter(path.resolve(__dirname, '..', 'examples/react')))
  .use('/ngtable', simpleRouter(path.resolve(__dirname, '..', 'examples/angular-ngtable')))
  .use('/bower_components', express.static(__dirname + '/../bower_components'));

app.listen(3000);
console.log('listening on http://localhost:3000');

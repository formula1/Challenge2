var Router = require('express').Router;
var path = require('path');

module.exports  = function(dirname) {
  var router = new Router();
  router.get('/', function(req, res){
    res.sendFile(path.join(dirname, 'index.html'));
  }).get('/index.html', function(req, res) {
    res.sendFile(path.join(dirname, 'index.html'));
  }).get('/index.css', function(req, res) {
    res.sendFile(path.join(dirname, 'index.css'));
  }).get('/index.js', function(req, res) {
    res.sendFile(path.join(dirname, 'index.js'));
  });

  return router;
};

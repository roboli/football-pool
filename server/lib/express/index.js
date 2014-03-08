var express = require('express');
var http = require('http');
var app = express();
var config = require('../configuration');
var routes = require('../routes');
var notFound = require('../middleware/notFound');

app.use(express.bodyParser());
app.set('port', config.get('express:port'));
app.get('/heartbeat', routes.heartbeat.index);
app.get('/tournament', routes.tournament.get);
app.get('/venue', routes.venue.all);
app.get('/venue/:id', routes.venue.get);
app.post('/venue', routes.venue.post);
app.use(notFound.index);

http.createServer(app).listen(app.get('port'));
module.exports = app;

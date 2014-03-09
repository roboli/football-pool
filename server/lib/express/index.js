var express = require('express');
var http = require('http');
var app = express();
var config = require('../configuration');
var routes = require('../routes');
var notFound = require('../middleware/notFound');
var id = require('../middleware/id');

app.use(express.bodyParser());
app.set('port', config.get('express:port'));
app.param('id', id.validate);
app.get('/heartbeat', routes.heartbeat.index);
app.get('/tournament', routes.tournament.get);
app.get('/venue', routes.venue.all);
app.get('/venue/:id', routes.venue.get);
app.post('/venue', routes.venue.post);
app.put('/venue/:id', routes.venue.put);
app.del('/venue/:id', routes.venue.del);
app.get('/team', routes.team.all);
app.get('/team/:id', routes.team.get);
app.post('/team', routes.team.post);
app.put('/team/:id', routes.team.put);
app.del('/team/:id', routes.team.del);
app.use(notFound.index);

http.createServer(app).listen(app.get('port'));
module.exports = app;

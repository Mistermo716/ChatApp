var http = require('http');
var express = require('express'),
	app = (module.exports.app = express());

var server = http.createServer(app);
var io = require('socket.io').listen(server); //pass a http.Server instance
const PORT = process.env.PORT || 3231;
server.listen(PORT); //listen on port 80
const SocketManager = require('./SocketManager');

io.on('connection', SocketManager);

app.listen(PORT, () => {
	console.log('Connected to port', PORT);
});

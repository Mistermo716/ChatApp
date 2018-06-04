const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = (module.exports.io = require('socket.io')(server));

const PORT = process.env.PORT || 3231;
const SocketManager = require('./SocketManager');

app.get('/', function(req, res) {
	res.sendfile(__dirname + '../../index.html');
});
io.on('connection', SocketManager);

server.listen(PORT, () => {
	console.log('Connected to port', PORT);
});
//build

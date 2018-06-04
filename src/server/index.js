const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = (module.exports.io = require('socket.io')(server));

const PORT = process.env.PORT || 8000;
const SocketManager = require('./SocketManager');

app.get('/', (req, res) => {
	res.sendFile(__dirname + '../../build');
});
io.on('connection', SocketManager);

server.listen(PORT, () => {
	console.log('Connected to port', PORT);
});
//build 2

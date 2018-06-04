const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = (module.exports.io = require('socket.io')(server));

const PORT = process.env.PORT || 3231;
const SocketManager = require('./SocketManager');

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function(request, response) {
	response.sendFile(path.resolve(__dirname, '../../build'));
});
io.on('connection', SocketManager);

server.listen(PORT, () => {
	console.log('Connected to port', PORT);
});
//build

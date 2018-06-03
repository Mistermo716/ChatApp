const io = require('./index.js').io;
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events');
const { createChat, createMessage, createUser } = require('../Factories');
let connectedUsers = {};

module.exports = function(socket) {
	console.log('Socket id: ', socket.id);

	//Verify Username
	socket.on(VERIFY_USER, (username, callback) => {
		if (isUser(connectedUsers, username)) {
			callback({ isUser: true });
		} else {
			callback({ isUser: false, user: createUser({ name: username }) });
		}
	});
	//User Connects with username
	socket.on(USER_CONNECTED, user => {
		connectedUsers = addUser(connectedUsers, user);
		socket.user = user;
		io.emit(USER_CONNECTED, connectedUsers);
	});

	function isUser(userList, username) {
		return username in userList;
	}

	function removeUser(userList, username) {
		let newList = Object.assign({}, userList);
		delete newList[username];
		return newList;
	}
	function addUser(userList, user) {
		let newList = Object.assign({}, userList);
		newList[user.name] = user;
		return newList;
	}
};

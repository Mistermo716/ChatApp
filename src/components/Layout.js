import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../Events';
import LoginForm from './LoginForm';
import Typing from 'react-typing-animation';
import ChatContainer from './ChatContainer';

const socketUrl = '/'; //new socket
export default class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: null,
			user: null,
		};
	}
	componentWillMount() {
		this.initSocket();
	}

	//Connect and intializes the socket s

	initSocket = () => {
		const socket = io(socketUrl);
		socket.on('connect', () => {
			if (this.state.user) {
				this.reconnect(socket);
			}
		});
		this.setState({ socket });
	};
	reconnect = socket => {
		socket.emit(VERIFY_USER, this.state.user.name, ({ isUser, user }) => {
			if (isUser) {
				this.setState({ user: null });
			} else {
				this.setUser(user);
			}
		});
	};

	//set user property in state
	setUser = user => {
		const { socket } = this.state;
		socket.emit(USER_CONNECTED, user);
		this.setState({ user });
	};

	logout = () => {
		const { socket } = this.state;
		socket.emit(LOGOUT);
		this.setState({ user: null });
	};
	render() {
		const { socket, user } = this.state;
		if (!user) {
			return (
				<div className="welcome">
					<Typing loop className="typed" speed={50}>
						Welcome to Socket Chat
						<Typing.Delay ms={1000} />
						<Typing.Backspace count={30} />
						Start chatting with the community
						<Typing.Delay ms={1000} />
						<Typing.Backspace count={40} />
						Or chat in private
						<Typing.Delay ms={1000} />
						<Typing.Backspace count={40} />
						Reserve a username below
						<Typing.Delay ms={1000} />
						<Typing.Backspace count={50} />
					</Typing>
					<LoginForm socket={socket} setUser={this.setUser} />
				</div>
			);
		} else {
			return <ChatContainer socket={socket} user={user} logout={this.logout} />;
		}
	}
}

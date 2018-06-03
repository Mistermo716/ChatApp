import React, { Component } from 'react';
import { VERIFY_USER } from '../Events';

export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			error: '',
		};
	}
	setUser = ({ user, isUser }) => {
		console.log(user, isUser);
		if (isUser) {
			this.setError('Username is taken');
		} else {
			this.props.setUser(user);
			this.setError = '';
		}
	};
	handleSubmit = e => {
		e.preventDefault();
		const { socket } = this.props;
		const { username } = this.state;
		socket.emit(VERIFY_USER, username, this.setUser);
	};
	handleChange = e => {
		e.preventDefault();
		this.setState({ username: e.target.value });
	};
	setError = error => {
		this.setState({ error });
	};
	render() {
		const { username, error } = this.state;
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form">
					<label htmlFor="nickname">
						<h2>Enter a username</h2>
					</label>
					<input
						ref={input => {
							this.textInput = input;
						}}
						type="text"
						id="username"
						value={username}
						onChange={this.handleChange}
						placeHolder={'username'}
					/>
					<div className="error">{error ? error : null}</div>
				</form>
			</div>
		);
	}
}

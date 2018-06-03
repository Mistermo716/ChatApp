import React, { Component } from 'react';

export default class ChatContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chats: [],
			activeChat: null,
		};
	}
	render() {
		const { user, logout } = this.props;
		const { chats, activeChat } = this.state;
		return (
			<div class="container">
				Chat Container
				<SideBar
					logout={logout}
					chats={chats}
					user={user}
					activeChat={activeChat}
					setActiveChate={this.setActiveChat}
				/>
			</div>
		);
	}
}

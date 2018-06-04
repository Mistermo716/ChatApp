import React, { Component } from 'react';
import FAChevronDown from 'react-icons/lib/md/keyboard-arrow-down';
import FAMenu from 'react-icons/lib/fa/list-ul';
import FASearch from 'react-icons/lib/fa/search';
import MdEject from 'react-icons/lib/md/eject';

export default class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reciever: '',
		};
	}
	handleSubmit = e => {
		e.preventDefault();
		const { reciever } = this.state;
		const { onSendPrivateMessage } = this.props;
		onSendPrivateMessage(reciever);
	};
	render() {
		const { chats, activeChat, user, setActiveChat, logout } = this.props;
		const { reciever } = this.state;
		return (
			<div id="side-bar">
				<div className="heading">
					<div className="app-name">Socket Chat</div>
				</div>
				<form onSubmit={this.handleSubmit} className="search">
					<i className="search-icon">
						<FASearch />
					</i>
					<input
						onChange={e => {
							this.setState({ reciever: e.target.value });
						}}
						placeholder="Search Username"
						type="text"
					/>
				</form>
				<div
					className="users"
					ref="users"
					onClick={e => {
						e.target === this.refs.user && setActiveChat(null);
					}}
				>
					{chats.map(chat => {
						if (chat.name) {
							const lastMessage = chat.messages[chat.messages.length - 1];
							const chatName =
								chat.users.find(name => {
									return name !== user.name;
								}) || 'Community';
							const classNames = activeChat && activeChat.id === chat.id ? 'active' : '';

							return (
								<div
									key={chat.id}
									className={`user ${classNames}`}
									onClick={() => {
										setActiveChat(chat);
									}}
								>
									<div className="user-photo">{chatName[0].toUpperCase()}</div>
									<div className="user-info">
										<div className="name">{chatName}</div>
										{lastMessage && <div className="last-message">{lastMessage.message}</div>}
									</div>
								</div>
							);
						}

						return null;
					})}
				</div>
				<div className="current-user">
					<span>{user.name}</span>
					<div
						onClick={() => {
							logout();
						}}
						title="Logout"
						className="logout"
					>
						<MdEject />
					</div>
				</div>
			</div>
		);
	}
}

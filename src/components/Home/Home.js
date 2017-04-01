import React, { PropTypes } from 'react';

import ChatRoom from '../ChatRoom/ChatRoom';
import UserList from '../UserList/UserList';
import ChatList from '../ChatList/ChatList';
import Navbar from '../Navbar/Navbar';
import s from './styles.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${s.home_container}`}>
        <div className={`${s.chatlist}`}>
          <ChatList
            currentChatID={this.props.currentChatRoom.uphere_id}
            user={this.props.user}
            chats={this.props.chatList}
            showChat={this.props.showChat} />
        </div>
        <div className={`${s.nav_container}`}>
          <div className={`${s.navbar}`}>
            <Navbar
              friendList={this.props.friendList}
              friends={this.props.currentChatRoom}
              user={this.props.user} />
          </div>
          <div className={`${s.navunder_container}`}>
            <div className={`${s.chatroom}`}>
              <ChatRoom
                chat={this.props.currentChatRoom}
                newMessage={this.props.newMessage}
                friendList={this.props.friendList}
                user={this.props.user} />
            </div>
            <div className={`${s.friend_list}`}>
              <UserList
                showChat={this.props.showChat}
                chats={this.props.chatList}
                onNewChat={this.props.onNewChat}
                friendList={this.props.friendList}
                user={this.props.user} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

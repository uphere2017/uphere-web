import React, { PropTypes } from 'react';

import ChatRoom from '../ChatRoom/ChatRoom';
import UserList from '../UserList/UserList';
import ChatList from '../ChatList/ChatList';
import s from './styles.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      user: {},
      chatRoom: {}
    };
  }

  componentDidMount() {
    this.setState({ user: this.props.user, chatRoom: this.props.currentChatRoom });
  }

  getMessage (msg) {
    this.props.newMessage(msg, this.props.user, 1);
  }

  render() {
    return (
      <div className={`${s.home_container}`}>
        <div className={`${s.home_item}` + ' ' + `${s.chatlist}`}>
          <ChatList chats={this.props.chatList}/>
        </div>
        <div className={`${s.home_item}`}>
          <ChatRoom chat={this.props.currentChatRoom} getMessage={this.getMessage.bind(this)} />
        </div>
        <div className={`${s.home_item}` + ' ' + `${s.friend_list}`}>
          <UserList friendList={this.props.friendList}/>
        </div>
      </div>
    );
  }
}

export default Home;

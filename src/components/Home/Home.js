import React, { PropTypes } from 'react';

import ChatRoom from '../ChatRoom/ChatRoom';
import UserList from '../UserList/UserList';
import ChatList from '../ChatList/ChatList';
import s from './styles.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${s.home_container}`}>
        <div className={`${s.home_item}` + ' ' + `${s.chatlist}`}>
          <ChatList />
        </div>
        <div className={`${s.home_item}`}>
          <ChatRoom />
        </div>
        <div className={`${s.home_item}` + ' ' + `${s.friend_list}`}>
          <UserList />
        </div>
      </div>
    );
  }
}

export default Home;

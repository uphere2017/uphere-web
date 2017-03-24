import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import history from '../history';
import ChatRoom from '../../components/ChatRoom/ChatRoom';
import UserList from '../../components/UserList/UserList';
import ChatList from '../../components/ChatList/ChatList';
import axios from 'axios';
import io from 'socket.io-client';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendList: []
    };
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8080/users/3/friend-list')
      .then(({ data }) => {
        this.setState({
          friendList: data
        });
      });

    const that = this;

    this.socket = io('http://127.0.0.1:8080');

    // Usage example
    setTimeout(() => {
      that.socket.emit('message', {
        text: 'Hello, World.',
        sender_id: 1
      });
    }, 10000);
  }

  render() {
    return (
      <Layout className={s.content}>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col">
            <UserList friendList={this.state.friendList} />
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <ChatList />
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <ChatRoom />
          </div>
        </div>
      </Layout>
    );
  };
}

export default HomePage;

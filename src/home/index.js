import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import history from '../history';
import ChatRoom from '../../components/ChatRoom/ChatRoom';
import UserList from '../../components/UserList/UserList';
import ChatList from '../../components/ChatList/ChatList';
import io from 'socket.io-client';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
            <UserList />
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

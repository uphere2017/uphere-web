import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Layout from '../../components/Layout';
import s from './styles.css';
import history from '../history';
import ChatRoom from '../../components/ChatRoom/ChatRoom';
import UserList from '../../components/UserList/UserList';
import ChatList from '../../components/ChatList/ChatList';
import socket from 'socket.io-client';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      loggedIn: false
    };
  }

  checkLoginState(e) {
    history.push({ pathname: '/about' });
  }

  componentDidMount() {
    FB.getLoginStatus((response) => {
      if (response.authResponse === null) {
        this.setState({
          loggedIn: false
        });
      } else {
        FB.api('/me', {fields: 'id,name,email,friends'}, (response) => {
          console.log(response);
          this.setState({
            loggedIn: true,
            username: response.name
          });
        });
      }
    });

    this.socket = io('http://13.124.88.51:8080');
    this.socket.on('connect', () => {});
    this.socket.on('disconnect', () => {});
  }

  changeLoginStatus() {
    if (this.state.loggedIn) {
      FB.logout((response) => {
        this.setState({
          loggedIn: false
        });
      });
    } else {
      FB.login((response) => {
        FB.api('/me', {fields: 'id,name,email,friends'}, (response) => {
          console.log(response);
          this.setState({
            loggedIn: true,
            username: response.name
          });
          history.push({ pathname: '/about' });
        });
      },
      {
        scope: 'public_profile,email,user_friends',
        auth_type: 'rerequest'
      });
    }
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

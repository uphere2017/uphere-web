import axios from 'axios';
import io from 'socket.io-client';
import React, { PropTypes } from 'react';
import s from './styles.css';
import ChatRoom from '../components/ChatRoom/ChatRoom';
import UserList from '../components/UserList/UserList';
import ChatList from '../components/ChatList/ChatList';
import FacebookLogin from 'react-facebook-login';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendList: [],
      username: null,
      email: null,
      fbID: null,
      fbToken: null
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

    that.socket = io('http://13.124.88.51:8080');

    // Usage example
    setTimeout(() => {
      that.socket.emit('message', {
        text: 'Hello, World.',
        sender_id: 1
      });
    }, 10000);
  }

  onLogin(data) {
    console.log('Logged in:', data);

    this.setState({
      fbToken: data.accessToken
    });

    FB.api('/me', {fields: 'id,name,email,friends'}, (response) => {
      console.log(response);

      this.setState({
        friends: response.friends.data
      });
    });
  }

  onLogout() {
    this.setState({
      fbToken: null
    });
  }

  render() {
    return (
      <div>
        {
          this.state.fbToken &&
          <nav className={`${s.navigation_bar}`}>
            <ul>
              <li>
                Uphere
              </li>
              <li>
                <button onClick={this.onLogout.bind(this)}>Logout</button>
              </li>
            </ul>
          </nav>
        }
        {
          !this.state.fbToken &&
          <div className={`${s.fb_login_button}`}>
            <h1>UPHERE</h1>
            <FacebookLogin
              appId="910249799115871"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              size="metro"
              callback={this.onLogin.bind(this)}
            />
          </div>
        }
        {
          this.state.fbToken &&
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
              <UserList friendList={this.state.friendList}/>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <ChatList />
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <ChatRoom />
            </div>
          </div>
        }
      </div>
    );
  };
}

export default HomePage;

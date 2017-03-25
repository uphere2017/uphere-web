import axios from 'axios';
import io from 'socket.io-client';
import React, { PropTypes } from 'react';
import s from './styles.css';
import ChatRoom from '../ChatRoom/ChatRoom';
import UserList from '../UserList/UserList';
import ChatList from '../ChatList/ChatList';
import FacebookLogin from 'react-facebook-login';
import { API_URL } from '../../config';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendList: [],
      username: null,
      email: null,
      fbID: null,
      fbToken: null,
      user_id: 0,
    };
  }
  componentDidMount() {
    axios.get(API_URL + '/users/20/friend-list')
      .then(({ data }) => {
        this.setState({
          friendList: data
        });
      });

    const that = this;

    that.socket = io(API_URL);

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

    FB.api('/me', {fields:'id, name, email, friends'}, (response) => {
      this.setState({
        friends: response.friends.data
      });

    var userdata = {
      name: data.name,
      profile_image_url: data.picture.data.url,
      facebook_id: data.id,
      email_address: data.email,
      friend_list: response.friends.data.map(friend => {
        return friend.id
      })
    };

    axios.post(API_URL + '/users', userdata)
      .then(userinfo => {
        this.setState((prevState, props) => {
          return { user_id: prevState.user_id || userinfo.data.user.uphere_id }
        });
      }).catch(error => {
        console.log('error', error);
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
              appId="272459766534622"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,email,user_friends"
              size="metro"
              callback={this.onLogin.bind(this)}
            />
          </div>
        }
        {
          this.state.fbToken &&
          <div className={`${s.app_container}`}>
            <div className={`${s.content_item}`}>
              <UserList friendList={this.state.friendList}/>
            </div>
            <div className={`${s.content_item}`}>
              <ChatList />
            </div>
            <div className={`${s.content_item}`}>
              <ChatRoom />
            </div>
          </div>
        }
      </div>
    );
  };
}

export default HomePage;

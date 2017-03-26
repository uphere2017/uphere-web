import axios from 'axios';
import io from 'socket.io-client';
import React, { PropTypes } from 'react';
import FacebookLogin from 'react-facebook-login';

import s from './styles.css';
import Home from '../Home/Home';
import { API_URL } from '../../config';

class App extends React.Component {
  constructor(props) {
    super(props);

    console.log('APP PROPS:', props);

    // TODO: Fix login behavior - ref: https://developers.facebook.com/docs/facebook-login/web
    this.state = {
      isLoading: true,
      isLoggedIn: false,
      name: null,
      email: null,
      facebookID: null,
      facebookAccessToken: null,
      friendList: null,
      uphereID: null
    };
  }

  getLoginStatus() {
    const that = this;

    if (window.FB) {
      FB.getLoginStatus(({ authResponse }) => {
        if (!authResponse) {
          that.setState({
            isLoading: false,
            isLoggedIn: false,
            name: null,
            email: null,
            facebookID: null,
            facebookAccessToken: null,
            friendList: null,
            uphereID: null
          });
        }
      });
    } else {
      setTimeout(that.getLoginStatus.bind(that), 300);
    }
  }

  componentDidMount() {
    const that = this;

    that.getLoginStatus();

    axios.get(API_URL + '/users/3/friend-list')
      .then(({ data }) => {
        that.setState({
          friendList: data
        });
      });

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

    FB.api('/me', {fields: 'id,name,email,friends'}, (response) => {
      console.log(response);

      this.setState({
        isLoading: false,
        isLoggedIn: true,
        name: response.name,
        email: response.email,
        friendList: response.friends.data,
        facebookAccessToken: data.accessToken
      });
    });
  }

  onLogout() {
    this.setState({
      name: null,
      email: null,
      facebookID: null,
      facebookAccessToken: null,
      friendList: null,
      uphereID: null
    });
  }

  _onClick() {
    this.props.onClick('Hellooow');
  }

  render() {
    return (
      <div onClick={this._onClick.bind(this)}>
        {
          this.props.todos.map((todo, i) => {
            return <div key={i}>{ todo }</div>;
          })
        }
        {
          !this.state.isLoggedIn && this.state.isLoading &&
          <div>
            <div className={`${s.coffee_cup}`}></div>
          </div>
        }
        {
          !this.state.isLoggedIn &&
          <div className={`${s.fb_login_button}`} style={{ display: this.state.isLoading ? 'none' : 'block' }}>
            <h1>UPHERE</h1>
            <FacebookLogin
              appId="272459766534622"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              size="metro"
              callback={this.onLogin.bind(this)}
            />
          </div>
        }
        {
          this.state.isLoggedIn &&
          <Home />
        }
      </div>
    );
  };
}

export default App;

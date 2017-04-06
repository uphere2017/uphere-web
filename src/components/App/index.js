import React, { PropTypes } from 'react';
import FacebookLogin from 'react-facebook-login';

import s from './styles.css';
import Home from '../Home/Home';
import Error from '../Error/Error';
import { FACEBOOK_APP_ID } from '../../config';

// Facebook login behavior reference: https://developers.facebook.com/docs/facebook-login/web
class App extends React.Component {
  constructor(props) {
    super(props);

    console.log('[UPHERE]APP_COMPONENT_PROPS:', props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this._onLoad();
  }

  _onLoad() {
    const that = this;

    if (window.FB) {
      that.props.onLoad()
        .then(() => {
          that.setState({
            isLoading: false
          });
        });
    } else {
      setTimeout(that._onLoad.bind(that), 500);
    }
  }

  _onLoginStart() {
    this.setState({
      isLoading: true
    });
  }

  _onLoginDone(data) {
    const that = this;

    that.props.onLogin(data)
      .then(() => {
        that.setState({
          isLoading: false
        });
      });
  }

  render() {
    const that = this;

    return (
      <div className={`${s.container}`}>
        {
          !this.props.isLoggedIn && this.state.isLoading &&
          <div>
            <div className={`${s.coffee_cup}`}></div>
          </div>
        }
        {
          <div className={`${s.fb_login_button}`}
               style={{ display: !this.props.isLoggedIn && !this.state.isLoading ? 'block' : 'none' }}>
            <h1>UPHERE</h1>
            <FacebookLogin
              onClick={that._onLoginStart.bind(that)}
              appId={FACEBOOK_APP_ID}
              autoLoad={false}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              size="metro"
              callback={that._onLoginDone.bind(that)}
            />
          </div>
        }
        {
          this.props.isLoggedIn && !this.state.isLoading &&
          <Home
            className={`${s.container}`}
            showChat={this.props.showChat}
            onNewChat={this.props.onNewChat}
            chatList={this.props.chatList}
            friendList={this.props.friendList}
            currentChatRoom={this.props.currentChatRoom}
            newMessage={this.props.newMessage}
            user={this.props.user}
            deleteChat={this.props.deleteChat}
            uploadImage={this.props.uploadImage} />
        }
        {
          this.props.error !== null &&
          <Error error={this.props.error} />
        }
      </div>
    );
  };
}

export default App;

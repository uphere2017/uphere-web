import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Layout from '../../components/Layout';
import s from './styles.css';
import history from '../history';

class LoginPage extends React.Component {
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
          this.setState({
            loggedIn: true,
            username: response.name
          });
        });
      }
    });
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
          this.setState({
            loggedIn: true,
            username: response.name
          });
          history.push({ pathname: '/home' });
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
        <h1>{this.state.username ? this.state.username : null}</h1>
        <button onClick={this.changeLoginStatus.bind(this)}>{this.state.loggedIn ? '로그아웃' : '로그인'}</button>
      </Layout>
    );
  }
}

export default LoginPage;

import { connect } from 'react-redux';

import {
  requestLoginStatus,
  receiveLoginSuccess,
  receiveLoginFailure,
  receiveFBUserData,
  receiveFBUserID,
  receiveFriendList
} from '../actionCreators';
import App from '../components/App';

const fetchFacebookUserData = (dispatch) => {
  return new Promise((resolve, reject) => {
    window.FB.api('/me', {fields: 'id,name,email,friends'}, ({ name, email = null, friends }) => {
      dispatch(receiveFBUserData({ name, email }));
      dispatch(receiveFriendList({ friendList: friends.data || [] }));
      resolve();
    });
  });
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(requestLoginStatus());

      return new Promise((resolve, reject) => {
        window.FB.getLoginStatus(({ status, authResponse }) => {
          switch (status) {
            // The person is logged into Facebook, and has logged into your app.
            case 'connected':
              dispatch(receiveLoginSuccess());
              dispatch(receiveFBUserID(authResponse.userID));
              fetchFacebookUserData(dispatch).then(resolve);
              return;
            // The person is logged into Facebook, but has not logged into your app.
            case 'not_authorized':
            // The person is not logged into Facebook, so you don't know if they've logged into your app.
            case 'unknown':
            default:
              dispatch(receiveLoginFailure());
              resolve();
              return;
          }
        });
      });
    },

    onLogin: ({ id }) => {
      dispatch(receiveLoginSuccess());
      dispatch(receiveFBUserID(id));
      return fetchFacebookUserData(dispatch);
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

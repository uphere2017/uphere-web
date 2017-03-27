import { connect } from 'react-redux';
import axios from 'axios';

import {
  requestLoginStatus,
  receiveLoginSuccess,
  receiveLoginFailure,
  receiveFBUserData,
  receiveFBUserID,
  receiveFriendList,
  receiveUserData
} from '../actionCreators';
import App from '../components/App';
import { API_URL } from '../config';

const fetchFacebookUserData = (dispatch) => {
  const mapID = (arr) => {
    if (arr) {
      return arr.map((i) => i.id);
    }
    return [];
  };

  return new Promise((resolve, reject) => {
    window.FB.api('/me', {fields: 'id,name,email,friends,picture'}, ({ id, name, email = null, friends, picture }) => {
      dispatch(receiveFBUserData({ name, email, picture }));
      // dispatch(receiveFriendIDList({ friendIDList: mapID(friends.data) }));

      axios.post(API_URL + '/users', {
        facebook_id: id,
        profile_image_url: picture.data.url,
        email_address: email,
        name,
        friend_list: mapID(friends.data)
      })
        .then(({ data }) => {
          axios.get(`${API_URL}/users/${data.user.uphere_id}/friend-list`)
            .then(response => {
              dispatch(receiveFriendList(response.data));
            })
            .catch(error => {console.log(error)})
          dispatch(receiveUserData({ user: data.user }));
          resolve();
        })
        .catch(reject);
    });
  });
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    friendList: state.friendList,
    chatList: state.chatList,
    currentChatRoom: state.currentChatRoom
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

import { connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';

import {
  requestLoginStatus,
  receiveLoginSuccess,
  receiveLoginFailure,
  receiveFBUserData,
  receiveFBUserID,
  receiveFriendList,
  receiveUserData,
  requestChatListStatus,
  requestChatListSuccess,
  requestChatListFailure,
  requestChatRoomSuccess
} from '../actionCreators';
import App from '../components/App';
import { API_URL } from '../config';

const socket = io(API_URL);

// Usage example
setTimeout(() => {
  socket.emit('message', {
    text: 'Hello, World.',
    sender_id: 1
  });
}, 10000);

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
              chatListRequest(dispatch, data.user.uphere_id, response.data);
              resolve();
            })
            .catch(err => {
              console.error('[UPHERE_WEB] Could not get friend list', err)
            });
          dispatch(receiveUserData({ user: data.user }));
        })
        .catch(reject);
    });
  });
};

const chatListRequest = (dispatch, uphere_id, friendList) => {
  return axios.get(`${API_URL}/users/${uphere_id}/chats`)
              .then(({ data }) => {
                data.chats.map((chat, i) => {
                  if(chat.participants.includes(uphere_id)) {
                    chat.participants[chat.participants.indexOf(uphere_id)] = friendList[i];
                  } else if (chat.participants.includes(friendList[i].uphere_id)) {
                    chat.participants[chat.participants.indexOf(friendList[i].uphere_id)] = friendList[i];
                  }
                  return chat;
                })
                dispatch(requestChatListSuccess(data.chats));
              })
              .catch(err => {
                dispatch(requestChatListFailure(err));
              });
}

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
    },

    showChat: (chatroom) => {
      dispatch(requestChatRoomSuccess(chatroom));
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

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
  requestChatListSuccess,
  requestChatListFailure,
  requestChatRoomSuccess,
  createChatSuccess,
  createChatFailure,
  receiveFriendOnline,
  createChatMessage,
  receiveNewMessage,
  updateCurrentChatroom
} from '../actionCreators';
import App from '../components/App';
import { API_URL } from '../config';
import { showMessageNotification } from '../utilities/notifications';

const socket = io(API_URL);

let addFriend;
let dispatchReceiveNewMessage;

const addFriendPartial = (dispatch) => (friendID) => {
  axios.get(`${API_URL}/users/${friendID}`)
    .then(({ data }) =>{
      dispatch(receiveFriendOnline(data));
    });
};

const receiveNewMessagePartial = (dispatch) => (message, chat_id) => {
  dispatch(receiveNewMessage(message, chat_id));
};

socket.on('FRIEND_ONLINE', ({ friend_id }) => {
  if (addFriend) {
    addFriend(friend_id);
  }
});

socket.on('RECEIVE_NEW_MESSAGE', ({ message, chat_id }) => {
  if (dispatchReceiveNewMessage) {
    dispatchReceiveNewMessage(message, chat_id);
  }

  showMessageNotification(message.text);
});

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

      axios.post(API_URL + '/users', {
        facebook_id: id,
        profile_image_url: picture.data.url,
        email_address: email,
        name,
        friend_list: mapID(friends.data)
      })
        .then(({ data }) => {
          data.user.token = data.token;
          dispatch(receiveUserData({ user: data.user }));

          socket.emit('LOG_IN', {
            user_uphere_id: data.user.uphere_id
          });

          axios.get(`${API_URL}/users/${data.user.uphere_id}/friend-list`, {
            headers: {
              'x-access-token': data.token
            }
          })
            .then(response => {
              socket.emit('USER_ONLINE', {
                user_uphere_id: data.user.uphere_id,
                friend_list: response.data.map((friend) => friend.uphere_id)
              });
              dispatch(receiveFriendList(response.data));
              chatListRequest(dispatch, data.user, response.data);
              resolve();
            })
            .catch(err => {
              console.error('[UPHERE_WEB] Could not get friend list', err)
            });
        })
        .catch(reject);
    });
  });
};

const chatListRequest = (dispatch, user, friendList) => {
  return axios.get(`${API_URL}/users/${user.uphere_id}/chats`, {
    headers: {
      'x-access-token': user.token
    }
  })
              .then(({ data }) => {
                data.chats.map((chat, i) => {
                  let userIndex;
                  let friendIndex;

                  if(chat.participants.includes(user.uphere_id)) {
                    userIndex = chat.participants.indexOf(user.uphere_id);
                    chat.participants[userIndex] = user;
                  }

                  friendIndex = userIndex === 0 ? 1 : 0;

                  const friend = friendList.filter((friend) => {
                    return friend.uphere_id === chat.participants[friendIndex];
                  })[0];

                  chat.participants[friendIndex] = friend;

                  return chat;
                });

                if (data.chats.length > 0) {
                  dispatch(requestChatListSuccess(data.chats));
                  dispatch(updateCurrentChatroom(data.chats[0]));
                }
              })
              .catch(err => {
                dispatch(requestChatListFailure(err));
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
  addFriend = addFriendPartial(dispatch);
  dispatchReceiveNewMessage = receiveNewMessagePartial(dispatch);

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

    onNewChat: (friendID, hostID, token) => {
      axios.post(API_URL + '/chats', {
        participants: [hostID, friendID],
        messages: []
      }, {
        headers: {
          'x-access-token': token
        }
      })
        .then((res) => {
          dispatch(updateCurrentChatroom(res.data.chat));
          dispatch(createChatSuccess(res.data.chat));
        })
        .catch(err => {
          dispatch(createChatFailure(err));
        })
    },

    onLogin: ({ id }) => {
      dispatch(receiveLoginSuccess());
      dispatch(receiveFBUserID(id));
      return fetchFacebookUserData(dispatch);
    },

    showChat: (chatroom) => {
      dispatch(requestChatRoomSuccess(chatroom));
    },

    newMessage: (message, chatroom, user) => {
      axios.post(API_URL + `/chats/${chatroom.uphere_id}`, {
        text: message,
        sender_id: user.uphere_id
      }, {
        headers: {
          'x-access-token': user.token
        }
      })
        .then(({ data }) => {
          dispatch(createChatMessage({
            chatroom: chatroom,
            text_id: data.id,
            user_id: user.uphere_id,
            text: message,
            created_at: data.created_at
          }));

          const receipient_id = chatroom.participants.filter((chatUser) => {
            return chatUser.uphere_id !== user.uphere_id;
          })[0].uphere_id;

          socket.emit('SEND_NEW_MESSAGE', {
            sender_id: user.uphere_id,
            chat_id: chatroom.uphere_id,
            text: message,
            created_at: data.created_at,
            text_id: data.id,
            receipient_id
          });
        });
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

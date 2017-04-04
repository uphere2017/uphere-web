import { connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import sentiment from 'sentiment';

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
  updateCurrentChatroom,
  receiveAppError,
  friendEmotionChange,
  requestDeleteChat,
  updateLastMessage,
  uploadImageFailure
} from '../actionCreators';
import App from '../components/App';
import { API_URL } from '../config';
import { showMessageNotification } from '../utilities/notifications';

const socket = io(API_URL);

let addFriend;
let dispatchReceiveNewMessage;
let dispatchFriendEmotionChange;
let dispatchUpdateChatList;

const addFriendPartial = (dispatch) => (friendID) => {
  axios.get(`${API_URL}/users/${friendID}`, {
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
    }
  }).then(({ data }) =>{
    dispatch(receiveFriendOnline(data));
  }).catch((err) => {
    console.error(`[Uphere_WEB] Could not add friend: ${err}`);
    dispatch(receiveAppError(err));
  });
};

const receiveNewMessagePartial = (dispatch) => (message, chat_id) => {
  dispatch(receiveNewMessage(message, chat_id));
};

const dispatchFriendEmotionChangePartial = (dispatch) => (emotion_status, friend_id) => {
  dispatch(friendEmotionChange(emotion_status, friend_id));
};

const dispatchUpdateChatListPartial = (dispatch) => () => {
  dispatch(updateLastMessage());
};

socket.on('FRIEND_ONLINE', ({ friend_id }) => {
  if (addFriend) {
    addFriend(friend_id);
  }
});

socket.on('RECEIVE_NEW_MESSAGE', ({ message, chat_id }) => {
  if (dispatchReceiveNewMessage) {
    dispatchReceiveNewMessage(message, chat_id);
    dispatchUpdateChatList();
  }

  showMessageNotification(message.text);
});

socket.on('FRIEND_EMOTION_CHANGE', ({ emotion_status, friend_id }) => {
  if (dispatchFriendEmotionChange) {
    dispatchFriendEmotionChange(emotion_status, friend_id);
  }
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

      axios.post(API_URL + '/login', {
        facebook_id: id,
        profile_image_url: picture.data.url,
        email_address: email,
        name,
        friend_list: mapID(friends.data)
      })
        .then(({ data }) => {
          dispatch(receiveUserData({ user: data.user }));

          window.sessionStorage.setItem('accessToken', data.accessToken);

          socket.emit('LOG_IN', {
            user_uphere_id: data.user.uphere_id
          });

          axios.get(`${API_URL}/users/${data.user.uphere_id}/friend-list`, {
            headers: {
              authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
            }
          }).then(response => {
            socket.emit('USER_ONLINE', {
              user_uphere_id: data.user.uphere_id,
              friend_list: response.data.map((friend) => friend.uphere_id)
            });
            dispatch(receiveFriendList(response.data));
            chatListRequest(dispatch, data.user, response.data);
            resolve();
          })
          .catch(err => {
            console.error('[UPHERE_WEB] Could not get friend list:', err)
            dispatch(receiveAppError(err));
          });
        })
        .catch((err) => {
          dispatch(receiveAppError(err));
          reject();
        });
    });
  });
};

const chatListRequest = (dispatch, user, friendList) => {
  return axios.get(`${API_URL}/users/${user.uphere_id}/chats`, {
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
    }
  }).then(({ data }) => {
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
    console.error(`[Uphere_WEB] Could not retrieve chat list: ${err}`);
  });
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    friendList: state.friendList,
    chatList: state.chatList,
    currentChatRoom: state.currentChatRoom,
    error: state.error
  };
};

const mapDispatchToProps = (dispatch) => {
  addFriend = addFriendPartial(dispatch);
  dispatchReceiveNewMessage = receiveNewMessagePartial(dispatch);
  dispatchFriendEmotionChange = dispatchFriendEmotionChangePartial(dispatch);
  dispatchUpdateChatList = dispatchUpdateChatListPartial(dispatch);

  window.onerror = (message, source, lineNum, colNum, err) => {
    dispatch(receiveAppError(err));
  };

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

    onNewChat: (friendID, hostID) => {
      axios.post(API_URL + '/chats', {
        participants: [hostID, friendID],
        messages: []
      }, {
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
        }
      }).then((res) => {
        dispatch(updateCurrentChatroom(res.data.chat));
        dispatch(createChatSuccess(res.data.chat));
      })
      .catch(err => {
        dispatch(createChatFailure(err));
        console.error(`[Uphere_WEB] Could not create new chat: ${err}`);
      });
    },

    onLogin: ({ id }) => {
      dispatch(receiveLoginSuccess());
      dispatch(receiveFBUserID(id));
      return fetchFacebookUserData(dispatch);
    },

    showChat: (chatroom) => {
      dispatch(requestChatRoomSuccess(chatroom));
    },

    newMessage: (message, chatroom, user, friendIdList, date) => {
      const emotions = sentiment(message);

      axios.post(API_URL + `/chats/${chatroom.uphere_id}`, {
        text: message,
        sender_id: user.uphere_id,
        emotion_status: emotions.score,
        created_at: date ? date : new Date().toISOString()
      }, {
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
        }
      }).then(({ data }) => {
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
          receipient_id,
          emotion_status: emotions.score,
          friend_list: friendIdList
        });
        dispatchUpdateChatList();
      }).catch((err) => {
        dispatch(receiveAppError(err));
        console.error(`[Uphere_WEB] Could not create new message: ${err}`);
      });
    },
    
    deleteChat: (chat_id) => {
      axios.delete(`${API_URL}/chats/${chat_id}`)
        .then((data) => {
          dispatch(requestDeleteChat(chat_id));
        })
        .catch((err) => {
          dispatch(receiveAppError(err));
        });
    },

    uploadImage: (chatroom, user, imagefile, friendIdList, date) => {
      const imageData = new FormData();
        imageData.append('name', imagefile.name)
        imageData.append('userfile', imagefile)
        imageData.append('userid', user.uphere_id)
        imageData.append('created_at', date ? date : new Date().toISOString())

      axios.post(API_URL + `/upload/${chatroom.uphere_id}`, imageData)
        .then(res => {
        dispatch(createChatMessage({
          chatroom: chatroom,
          text_id: res.data.uphere_id,
          user_id: user.uphere_id,
          text: res.data.text,
          created_at: res.data.created_at
        }));

        const receipient_id = chatroom.participants.filter((chatUser) => {
          return chatUser.uphere_id !== user.uphere_id;
        })[0].uphere_id;

        socket.emit('SEND_NEW_MESSAGE', {
          sender_id: user.uphere_id,
          chat_id: chatroom.uphere_id,
          text: res.data.text,
          created_at: res.data.created_at,
          text_id: res.data.uphere_id,
          receipient_id,
          friend_list: friendIdList
        });
      }).catch((err) => {
        dispatch(uploadImageFailure(err));
      })
    }
  };
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

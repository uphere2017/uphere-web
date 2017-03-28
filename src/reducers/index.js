import { combineReducers } from 'redux';

import {
  REQUEST_LOGIN_STATUS,
  RECEIVE_LOGIN_SUCCESS,
  RECEIVE_LOGIN_FAILURE,
  RECEIVE_FB_USER_DATA,
  RECEIVE_FB_USER_ID,
  RECEIVE_FRIEND_LIST,
  RECEIVE_USER_DATA,
  REQUEST_CHAT_LIST_SUCCESS,
  REQUEST_CHAT_LIST_FAILURE,
  REQUEST_CHAT_ROOM_SUCCESS,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAILURE,
  RECEIVE_FRIEND_ONLINE,
  CREATE_CHAT_MESSAGE
} from '../actionTypes';

const login = (state = false, action) => {
  switch (action.type) {
    case REQUEST_LOGIN_STATUS:
    case RECEIVE_LOGIN_FAILURE:
      return false;
    case RECEIVE_FB_USER_DATA:
    case RECEIVE_FRIEND_LIST:
    case RECEIVE_LOGIN_SUCCESS:
    case RECEIVE_FB_USER_ID:
    default:
      return true;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FB_USER_DATA:
      return Object.assign({}, state, {
        name: action.name,
        email: action.email,
        profilePictureUrl: action.picture.data.url
      });
    case RECEIVE_FB_USER_ID:
      return Object.assign({}, state, {
        facebookID: action.facebookID
      });
    case RECEIVE_USER_DATA:
      return Object.assign({}, state, {
        uphereID: action.user.uphereID,
        name: action.user.name,
        email: action.user.email,
        profilePictureUrl: action.user.profilePictureUrl
      });
    default:
      return Object.assign({}, state);
  }
};

const friendList = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FRIEND_LIST:
      return action.friendList.map((friend) => {
        return Object.assign({}, state, {
          name: friend.name,
          email: friend.email_address,
          facebookID: friend.facebook_id,
          uphereID: friend.uphere_id,
          profilePictureUrl: friend.profile_image_url
        });
      });
    case RECEIVE_FRIEND_ONLINE:
      const newState = state.slice();
      newState.forEach((friend) => {
        if(friend.uphereID === action.friend.uphere_id) {
          newState.push(action.friend);
        }
      });
      return newState;
    default:
      return state.slice();
  };
};

const chatList = (state = [], action) => {
  switch (action.type) {
    case REQUEST_CHAT_LIST_FAILURE:
      return [{ errorMessage: action.err }];
    case REQUEST_CHAT_LIST_SUCCESS:
      return action.chats.map((chatroom) => {
        return Object.assign({}, state, {
          uphere_id: chatroom.uphere_id,
          participants: chatroom.participants,
          messages: chatroom.messages
        });
      });
    case CREATE_CHAT_SUCCESS:
      const newChat = { uphereID: action.id };
      const newState = state.slice();
      newState.push(newChat);
      return newState;
    case CREATE_CHAT_FAILURE:
      return state.slice();
    case CREATE_CHAT_MESSAGE:
      const chats = state.slice();
      chats.forEach((chat) => {
        if (chat.uphere_id === action.chatroom.uphere_id) {
          chat.messages.push({
            sender_id: action.user_id,
            text: action.text,
            uphere_id: action.text_id
          });
        }
      });
      return chats;
    default:
      return state.slice();
  }
};

const currentChatRoom = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CHAT_ROOM_SUCCESS:
      return Object.assign({}, state, {
        uphere_id: action.chatroom.uphere_id,
        participants: action.chatroom.participants,
        messages: action.chatroom.messages
      });
    case CREATE_CHAT_MESSAGE:
      var msg = {
        uphereID: action.text_id,
        senderID: action.user_id,
        text: action.text
      };
      var newState = Object.assign({}, state);
      newState.messages.push(msg);
      return newState;
    default:
      return Object.assign({}, state);
  };
};

export default combineReducers({
  isLoggedIn: login,
  user,
  friendList,
  chatList,
  currentChatRoom
});

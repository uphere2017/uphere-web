import { combineReducers } from 'redux';

import {
  REQUEST_LOGIN_STATUS,
  RECEIVE_LOGIN_SUCCESS,
  RECEIVE_LOGIN_FAILURE,
  RECEIVE_FB_USER_DATA,
  RECEIVE_FB_USER_ID,
  RECEIVE_FRIEND_LIST,
  RECEIVE_USER_DATA,
  REQUEST_CHAT_LIST_STATUS,
  REQUEST_CHAT_LIST_SUCCESS,
  REQUEST_CHAT_LIST_FAILURE,
  REQUEST_CHAT_ROOM_SUCCESS
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

const user = (state, action) => {
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
  };
};

const friendList = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FRIEND_LIST:
      return action.friendList.map((friend) => {
        return {
          name: friend.name,
          email: friend.email_address,
          facebookID: friend.facebook_id,
          uphereID: friend.uphere_id,
          profilePictureUrl: friend.profile_image_url
        };
      });
    default:
      return [];
  };
};

const chatList = (state, action) => {
  switch (action.type) {
    case REQUEST_CHAT_LIST_FAILURE:
      return [{ errorMessage: action.err }];
    case REQUEST_CHAT_LIST_SUCCESS:
      return action.chats.map((chatroom) => {
        return {
          uphere_id: chatroom.uphere_id,
          participants: chatroom.participants,
          messages: chatroom.messages
        };
      });
    default:
      return [];
  };
};

const currentChatRoom = (state = null, action) => {
  switch (action.type) {
    case REQUEST_CHAT_ROOM_SUCCESS:
      return Object.assign({}, state, {
        uphere_id: action.chatroom.uphere_id,
        participants: action.chatroom.participants,
        messages: action.chatroom.messages
      })
    default:
      return state;
  };
};

export default combineReducers({
  isLoggedIn: login,
  user,
  friendList,
  chatList,
  currentChatRoom,
});

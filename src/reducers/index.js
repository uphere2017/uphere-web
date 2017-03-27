import { combineReducers } from 'redux';

import {
  REQUEST_LOGIN_STATUS,
  RECEIVE_LOGIN_SUCCESS,
  RECEIVE_LOGIN_FAILURE,
  RECEIVE_FB_USER_DATA,
  RECEIVE_FB_USER_ID,
  RECEIVE_FRIEND_ID_LIST,
  RECEIVE_USER_DATA
} from '../actionTypes';

const login = (state = false, action) => {
  switch (action.type) {
    case REQUEST_LOGIN_STATUS:
    case RECEIVE_LOGIN_FAILURE:
      return false;
    case RECEIVE_FB_USER_DATA:
    case RECEIVE_FRIEND_ID_LIST:
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
    case RECEIVE_FRIEND_ID_LIST:
      return action.friendIDList.map((friendID) => {
        return {
          name: null,
          email: null,
          facebookID: friendID,
          uphereID: null,
          profilePictureUrl: null
        };
      });
    default:
      return [];
  };
};

const chatList = (state = [], action) => {
  return [];
};

const currentChatRoom = (state = null, action) => {
  return state;
};

export default combineReducers({
  isLoggedIn: login,
  user,
  friendList,
  chatList,
  currentChatRoom,
});

import { combineReducers } from 'redux';

import {
  REQUEST_LOGIN_STATUS,
  RECEIVE_LOGIN_SUCCESS,
  RECEIVE_LOGIN_FAILURE,
  RECEIVE_FB_USER_DATA,
  RECEIVE_FB_USER_ID,
  RECEIVE_FRIEND_LIST,
  RECEIVE_USER_DATA,
  CREATE_CHAT_MESSAGE,
  UPDATE_CHAT_MESSAGE
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

const chatList = (state = [], action) => {
  switch (action.type) {
    case CREATE_CHAT_MESSAGE:
      return action.chatList.map((chatGroup) => {
        if(chatGroup.uphereID === action.chatRoom.uphereID){
          chatGroup.lastMessage = {
            uphereID: action.message.text_ID, // Message uphereID
            senderID: action.message.sender_ID, // User uphereID
            text: action.message.text
          }
        }
      });
    default:
      return [];        
  }
};

const currentChatRoom = (state = null, action) => {
  switch (action.type) {
    case UPDATE_CHAT_MESSAGE:
      var msg = {
        uphereID: action.message.text_ID,
        senderID: action.message.sender_ID,
        text: action.message.message
      };
      action.message.chatRoom.messages.push(msg);
      return Object.assign({}, state, action.message.chatRoom);
  }
  return state;
};

export default combineReducers({
  isLoggedIn: login,
  user,
  friendList,
  chatList,
  currentChatRoom,
});

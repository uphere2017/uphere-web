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
  CREATE_CHAT_MESSAGE,
  RECEIVE_NEW_MESSAGE,
  UPDATE_CURRENT_CHATROOM,
  RECEIVE_APP_ERROR,
  FRIEND_EMOTION_CHANGE,
  REQUEST_DELETE_CHAT,
  UPDATE_LAST_MESSAGE,
  UPLOAD_IMAGE_FAILURE
} from '../actionTypes';

export const requestLoginStatus = () => {
  return {
    type: REQUEST_LOGIN_STATUS
  };
};

export const receiveLoginSuccess = () => {
  return {
    type: RECEIVE_LOGIN_SUCCESS
  };
};

export const receiveLoginFailure = () => {
  return {
    type: RECEIVE_LOGIN_FAILURE
  };
};

export const receiveFBUserData = ({ name, email, picture }) => {
  return {
    type: RECEIVE_FB_USER_DATA,
    name,
    email,
    picture
  };
};

export const receiveFriendList = (friendList) => {
  return {
    type: RECEIVE_FRIEND_LIST,
    friendList
  };
};

export const receiveFBUserID = (facebookID) => {
  return {
    type: RECEIVE_FB_USER_ID,
    facebookID
  };
};

export const receiveUserData = ({ user }) => {
  return {
    type: RECEIVE_USER_DATA,
    user: {
      uphere_id: user.uphere_id,
      name: user.name,
      email: user.email_address,
      profile_image_url: user.profile_image_url
    }
  };
};

export const requestChatListSuccess = (chats) => {
  return {
    type: REQUEST_CHAT_LIST_SUCCESS,
    chats
  };
};

export const requestChatListFailure = (err) => {
  return {
    type: REQUEST_CHAT_LIST_FAILURE,
    error: err
  };
};

export const requestChatRoomSuccess = (chatroom) => {
  return {
    type: REQUEST_CHAT_ROOM_SUCCESS,
    chatroom
  };
};

export const createChatSuccess = ( chatroom ) => {
  return {
    type: CREATE_CHAT_SUCCESS,
    chatroom
  };
};

export const createChatFailure = ( ) => {
  return {
    type: CREATE_CHAT_FAILURE
  };
};

export const receiveFriendOnline = (friend) => {
  return {
    type: RECEIVE_FRIEND_ONLINE,
    friend
  };
};

export const createChatMessage = ({ chatroom, text_id, user_id, text, created_at }) => {
  return {
    type: CREATE_CHAT_MESSAGE,
    chatroom: chatroom,
    text_id,
    user_id,
    text,
    created_at
  };
};

export const receiveNewMessage = (message, chat_id) => {
  return {
    type: RECEIVE_NEW_MESSAGE,
    message,
    chat_id
  };
};

export const updateCurrentChatroom = (chatroom) => {
  return {
    type: UPDATE_CURRENT_CHATROOM,
    chatroom
  };
};

export const receiveAppError = (err) => {
  return {
    type: RECEIVE_APP_ERROR,
    error: err
  };
};

export const friendEmotionChange = (emotion_status, friend_id) => {
  return {
    type: FRIEND_EMOTION_CHANGE,
    friend_id,
    emotion_status
  };
};

export const requestDeleteChat = (chat_id) => {
  return {
    type: REQUEST_DELETE_CHAT,
    chat_id
  };
};

export const updateLastMessage = () => {
  return {
    type: UPDATE_LAST_MESSAGE
  };
};

export const uploadImageFailure = (err) => {
  return {
    type: UPLOAD_IMAGE_FAILURE,
    error: err
  };
};

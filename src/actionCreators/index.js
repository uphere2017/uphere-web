import {
  REQUEST_LOGIN_STATUS,
  RECEIVE_LOGIN_SUCCESS,
  RECEIVE_LOGIN_FAILURE,
  RECEIVE_FB_USER_DATA,
  RECEIVE_FB_USER_ID,
  RECEIVE_FRIEND_LIST,
  RECEIVE_USER_DATA
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
      uphereID: user.uphere_id,
      name: user.name,
      email: user.email_address,
      profilePictureUrl: user.profile_image_url
    }
  };
};

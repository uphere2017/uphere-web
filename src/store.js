import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import reducers from './reducers';

const initialState = {
  isLoggedIn: false,
  user: {
    uphereID: null,
    name: null,
    email: null,
    facebookID: null,
    profilePictureUrl: null
  },
  currentChatRoom: null,
  friendList: [],
  chatList: []
};

const store = createStore(reducers, initialState, applyMiddleware(logger));
console.log('[UPHERE]INITIAL_APP_STATE:', store.getState());

export default store;

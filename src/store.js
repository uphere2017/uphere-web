import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import reducers from './reducers';

/*
 * Example friend<Object> for friendList<Array>
 *
 * {
 *   uphereID: 3,
 *   name: "ken huh",
 *   email: "ballaholicken@gmail.com",
 *   facebookID: "12388348432",
 *   profilePictureUrl: "https://image.com/kenhuh.jpg"
 * }
 *
*/

/*
 * Example chat<Object> for chatList<Array>
 *
 * {
 *   uphereID: 1, // Chat uphereID
 *   participants: [
 *     {
 *       uphereID: 3,
 *       name: "ken huh",
 *       email: "ballaholicken@gmail.com",
 *       facebookID: "12388348432",
 *       profilePictureUrl: "https://image.com/kenhuh.jpg"
 *     },
 *     {
 *       uphereID: 1,
 *       name: "jinho Do",
 *       email: "jinho@gmail.com",
 *       facebookID: "897427429323",
 *       profilePictureUrl: "https://image.com/jinhodo.jpg"
 *     }
 *   ],
 *   lastMessage: {
 *     uphereID: 1, // Message uphereID
 *     senderID: 3, // User uphereID
 *     text: "Where are you?"
 *   }
 * }
 *
*/

/*
 * Example currentChatRoom data<Object>
 *
 * {
 *   uphereID: 1, // Chat uphereID
 *   participants: [
 *     {
 *       uphereID: 3, // User uphereID
 *       name: "ken huh",
 *       email: "ballaholicken@gmail.com",
 *       facebookID: "12388348432",
 *       profilePictureUrl: "https://image.com/kenhuh.jpg"
 *     },
 *     {
 *       uphereID: 1, // User uphereID
 *       name: "jinho Do",
 *       email: "jinho@gmail.com",
 *       facebookID: "897427429323",
 *       profilePictureUrl: "https://image.com/jinhodo.jpg"
 *     }
 *   ],
 *   messages: [
 *     {
 *       uphereID: 1, // Message uphereID
 *       senderID: 3, // User uphereID,
 *       text: "Where are you?"
 *     },
 *     {
 *       uphereID: 2, // Message uphereID
 *       senderID: 1, // User uphereID,
 *       text: "I am at Peach Tree."
 *     }
 * }
 *
*/

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

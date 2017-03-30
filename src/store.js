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
 *   messages: [
 *     {
 *       uphereID: 1, // Message uphereID
 *       participants: [1, 3], // User uphereID,
 *       messages: [{
 *        uphereID: 1,
 *        senderID: 3,
 *        text: "Who are you?"
 *     },
 *     {
 *       uphereID: 1, // Message uphereID
 *       participants: [1, 3], // User uphereID,
 *       messages: [{
 *        uphereID: 2,
 *        senderID: 1,
 *        text: "I am at Peach Tree."
 *     },
 * ]
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
 * ]
 *
*/

const initialState = {
  isLoggedIn: false,
  user: {
    uphere_id: null,
    name: null,
    email: null,
    facebookID: null,
    profile_image_url: null,
    token: null
  },
  currentChatRoom: {
    uphere_id: null,
    participants: null,
    messages: null
  }
  // friendList: [{
  //         name: null,
  //         email: null,
  //         facebookID: null,
  //         uphereID: null,
  //         profilePictureUrl: null
  //       }],
  // chatList: {
  //         uphere_id: null,
  //         participants: null,
  //         messages: null
  //       }
};

const store = createStore(reducers, initialState, applyMiddleware(logger));
console.log('[UPHERE]INITIAL_APP_STATE:', store.getState());

export default store;

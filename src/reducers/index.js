import { combineReducers } from 'redux'
import todo from './todo';

const todoApp = combineReducers({
  todos
});

export default todoApp;

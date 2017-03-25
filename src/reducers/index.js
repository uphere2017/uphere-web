import { combineReducers } from 'redux'
import todos from './todo';

const todoApp = combineReducers({
  todos
});

export default todoApp;

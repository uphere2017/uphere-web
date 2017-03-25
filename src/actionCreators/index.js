import {
  ADD_TODO,
  TOGGLE_TODO
} from './actionTypes';

const todoId = 0;

const addTodo = (text) => {
  return {
    type: ADD_TODO,
    id: todoId++,
    text,
    completed: false
  };
};

const toggleTodo = id => {
  return {
    id,
    type: TOGGLE_TODO
  }
};

export default {
  addTodo,
  toggleTodo
};

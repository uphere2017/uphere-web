import {
  ADD_TODO
} from '../actionTypes';

let todoId = 3;

export const addTodo = (text) => {
  console.log('ActionCreator:addTodo:', text);
  return {
    type: ADD_TODO,
    id: todoId++,
    text
  };
};

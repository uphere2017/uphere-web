import { createStore } from 'redux';
import uphereReducers from './reducers';

const initialState = {
  todos: [
    {
      id: 0,
      text: 'hello'
    },
    {
      id: 1,
      text: 'hi, there'
    },
    {
      id: 2,
      text: 'why, there'
    }
  ]
};

const store = createStore(uphereReducers, initialState);
console.log('Initial App State:', store.getState());

export default store;

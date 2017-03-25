import { createStore } from 'redux';
import uphereReducers from './reducers';

const initialState = { count: 0 };

const store = createStore(uphereReducers);

export default store;

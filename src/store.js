import { createStore } from 'redux';

const initialState = { count: 0 };

const store = createStore((state = initialState, action) => {
  // TODO: Add action handlers (aka "reducers")
  switch (action.type) {
    case 'COUNT':
      return { ...state, count: (state.count) + 1 };
    default:
      return state;
  }
});

export default store;

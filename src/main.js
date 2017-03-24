import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Home from './home';

const container = document.getElementById('container');

function renderComponent() {
  ReactDOM.render(<Provider store={store}><Home /></Provider>, container);
}

renderComponent();

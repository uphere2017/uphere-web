import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import AppContainer from './containers/App';
import { getNotificationPermission } from './utilities/notifications';

const container = document.getElementById('container');

function renderComponent() {
  ReactDOM.render(<Provider store={store}><AppContainer /></Provider>, container);
}

renderComponent();
getNotificationPermission();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import store from './store';
import AppContainer from './containers/App';
import { getNotificationPermission } from './utilities/notifications';

const container = document.getElementById('container');

function renderComponent() {
  ReactDOM.render(<Provider store={store}>
      <Router>
        <Route path="/" component={AppContainer} />
      </Router>
    </Provider>, container);
}

renderComponent();
getNotificationPermission();

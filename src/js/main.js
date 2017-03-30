import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import ReactDOM from 'react-dom';
import App from './components/App';

import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import Store from './store';
const store = new Store();

useStrict(true);

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

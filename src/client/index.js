import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';

const store = configureStore(window.__PRELOADED_STATE__);
window.store = store;

hydrate(
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('../common/containers/App', () => {
    hydrate(
      <Provider store={store}>
        <BrowserRouter  >
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    );
  });
}

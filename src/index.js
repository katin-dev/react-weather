import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware  } from 'redux';
import appReducer from './reducers/index';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(appReducer);

const edge = 100;
window.setInterval(() => {
  const dt = new Date();
  store.dispatch({
    type: 'update',
    payload: {
      label: dt.getHours() + ':' + dt.getMinutes() + ' ' + dt.getSeconds(),
      value: edge + Math.random() * 50
    }
  });
}, 1000);

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
  , document.getElementById('root')
);
registerServiceWorker();

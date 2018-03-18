import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware  } from 'redux';
import { ACTION_BULK_UPDATE, ACTION_SINGLE_UPDATE, IndexReducer } from './reducers/index';
import { Provider } from 'react-redux';
// import io from 'socket.io-client';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(IndexReducer);

const edge = 100;

// const socket = io('http://localhost/');
const socket = new WebSocket('ws://weather.gourry.ru:8081/');

socket.onmessage = (event) => {
  // Пока не делаю разделения между co2 и другими значениями
  const data = JSON.parse(event.data);
  // @TODO action надо вынести в отдельный файл
  console.log("New data", event.data);
  store.dispatch({
    type: ACTION_SINGLE_UPDATE,
    payload: {
      date:  data.date,
      value: data.co2
    }
  });
}

// При загрузке приложения надо подтянуть с сервера данные по погоде
fetch('http://weather.gourry.ru/co2').then((response) => {
  response
    .json()
    .then((jsonResponse) => {
      store.dispatch({
        type : ACTION_BULK_UPDATE,
        payload : jsonResponse
      });
    });
});

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
  , document.getElementById('root')
);
registerServiceWorker();

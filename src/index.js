import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, compose} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from "react-router-dom";
import createSagaMiddleware from 'redux-saga';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

import IndexReducer from './index-reducer';
import IndexSagas from './index-sagas';

const sagaMiddleware = createSagaMiddleware();

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/*eslint-enable */

const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
);

sagaMiddleware.run(IndexSagas);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

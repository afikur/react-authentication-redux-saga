import {take, fork, cancel, call, put, cancelled} from 'redux-saga/effects';
import history from './../history';

import {handleApiErrors} from '../lib/api-errors'

import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

import {
  setClient,
  unsetClient,
} from '../client/actions';

import {
  CLIENT_UNSET,
} from '../client/constants';

const loginUrl = `${process.env.REACT_APP_API_URL}/api/Clients/login`;

function loginApi(email, password) {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {
      throw error
    });
}

function* loginFlow(email, password) {
  let token;
  try {
    token = yield call(loginApi, email, password);

    yield put(setClient(token));

    yield put({type: LOGIN_SUCCESS});

    localStorage.setItem('token', JSON.stringify(token));

    yield call(history.push, '/widgets');
  } catch (error) {
    yield put({type: LOGIN_ERROR, error})
  } finally {
    if (yield cancelled()) {
      yield call(history.push, '/login');
    }
  }

  return token
}

function* logout() {
  yield put(unsetClient());

  localStorage.removeItem('token');

  yield call(history.push, '/login');
}

function* loginWatcher() {
  while (true) {
    const {email, password} = yield take(LOGIN_REQUESTING);

    const task = yield fork(loginFlow, email, password);

    const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);

    if (action.type === CLIENT_UNSET) yield cancel(task);

    yield call(logout);
  }
}

export default loginWatcher;

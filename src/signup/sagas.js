import {takeLatest, call, put} from 'redux-saga/effects';
import {SIGNUP_ERROR, SIGNUP_REQUESTING, SIGNUP_SUCCESS} from "./constants";
import { handleApiErrors } from '../lib/api-errors'

const signupUrl = `${process.env.REACT_APP_API_URL}/api/Clients`;

function signupApi(email, password) {
  return fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleApiErrors) // we'll make this in a second
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* signupFlow(action) {
  try {
    const {email, password} = action;
    const response = yield call(signupApi, email, password);
    yield put({type: SIGNUP_SUCCESS, response});
  } catch (error) {
    yield put({type: SIGNUP_ERROR, error});
  }
}

function* signupWatcher() {
  yield takeLatest(SIGNUP_REQUESTING, signupFlow);
}

export default signupWatcher;

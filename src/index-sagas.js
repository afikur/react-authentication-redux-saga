import {all} from 'redux-saga/effects';
import SignupSaga from './signup/sagas';
import LoginSaga from './login/sagas';

export default function* IndexSaga() {
  yield all([
    LoginSaga(),
    SignupSaga(),
  ]);
}

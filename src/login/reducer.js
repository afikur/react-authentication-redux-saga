import {LOGIN_ERROR, LOGIN_REQUESTING, LOGIN_SUCCESS} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
};


const reducer = function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in..', time: new Date() }],
        errors: [],
      };
    case LOGIN_SUCCESS:
      return {
        errors: [],
        message: [],
        requesting: false,
        successful: true
      };
    case LOGIN_ERROR:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date()
        }]),
        message: [],
        requesting: false,
        successful: false,
      };
    default:
      return state;
  }
};

export default reducer;

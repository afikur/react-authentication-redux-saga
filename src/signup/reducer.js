import {SIGNUP_ERROR, SIGNUP_REQUESTING, SIGNUP_SUCCESS} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  message: [],
  errors: []
};

const reducer = function signupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUESTING:
      return {
        requesting: true,
        successful: false,
        message: [{ body: 'Signing up...', time: new Date() }],
        errors: [],
      };

    case SIGNUP_SUCCESS:
      return {
        errors: [],
        messages: [{
          body: `Successfully created account for ${action.response.email}`,
          time: new Date(),
        }],
        requesting: false,
        successful: true,
      };

    case SIGNUP_ERROR:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      };

    default:
      return state;
  }
};

export default reducer;

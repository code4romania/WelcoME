import { AUTH_USER, AUTH_ERROR, SIGN_OUT_USER } from '../actions';

const initialState =  {
  authenticated: false,
  error: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null,
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message,
      };
    default:
      return state;
  }
}

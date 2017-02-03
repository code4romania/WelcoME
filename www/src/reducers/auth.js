import {AUTH_USER, AUTH_ERROR, AUTH_REQUEST, RECEIVED_PROFILE} from '../actions';

const initialState = {
  authenticated: false,
  user: null,
  profile: {
    received: false,
    name: '',
    surname: ''
  },
  pending: true,
  error: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: !!action.payload,
        pending: false,
        user: action.payload,
        error: null
      };
    case AUTH_REQUEST:
      return {
        ...state,
        pending: true
      };
    case AUTH_ERROR:
      return {
        ...state,
        authenticated: false,
        pending: false,
        user: null,
        error: action.payload
      };
    case RECEIVED_PROFILE:
      return {
        ...state,
        profile: {
          received: true,
          name: action.payload != null
            ? action.payload.name
            : '',
          surname: action.payload != null
            ? action.payload.surname
            : ''
        }
      };
    default:
      return state;
  }
}

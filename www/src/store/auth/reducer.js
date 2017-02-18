// auth store
import { registerAction, Reducers, Actions, dispatch, Handlers } from '../../rxdux'

// actions
registerAction('AUTH_USER');
registerAction('SIGNIN_EMAIL_REQUESTED');
registerAction('SIGNUP_EMAIL_REQUESTED');
registerAction('SIGNOUT_REQUESTED');
registerAction('FORGOT_REQUESTED');
registerAction('EDIT_PROFILE_REQUESTED');
registerAction('LOAD_PROFILE');

// handlers
// UI handlers
// user requested signup with email and password
Handlers.requestSignup = fields => dispatch(Actions.SIGNUP_EMAIL_REQUESTED, fields)
// user requested login with email and password
Handlers.requestLogin = fields => dispatch(Actions.SIGNIN_EMAIL_REQUESTED, fields)
// user requested recovery of the password on email
Handlers.requestForgot = fields => dispatch(Actions.FORGOT_REQUESTED, fields)
// user requests to signout
Handlers.requestSignout = () => dispatch(Actions.SIGNOUT_REQUESTED)
// user request to edit profile
Handlers.requestEditProfile = fields => dispatch(Actions.EDIT_PROFILE_REQUESTED, fields);

// Services handlers
// authenticate user or signout user if null
Handlers.authUser = user => dispatch(Actions.AUTH_USER, user)

// User profile data loaded
Handlers.loadProfile = user => dispatch(Actions.LOAD_PROFILE, user);

// messages to forms and alerts with auth types: isError, isOk, isWarning, isInfo
// routes param is an array with the pathnames of the routes to show the message
// error message
Handlers.errorUser = (id, title, {message}, timeOut) =>
  id && title && Handlers.addToastr({
    id,
    title,
    message: message || 'Unknown error',
    type: 'error',
    options: {
      showCloseButton: true,
      timeOut: timeOut || 17000
    }})
// success
Handlers.okUser = (id, title, message, timeOut) =>
  id && title && Handlers.addToastr({
    id,
    title,
    message,
    type: 'success',
    options: {
      showCloseButton: true,
      timeOut: timeOut || 12000
    }})

// reducer
const initialState = {
  // loading stands for initial fetching of auth state status from Firebase
  loading: true
}

Reducers.auth = (state = initialState, action) => {
  switch (action.type) {
    case Actions.AUTH_USER:
      return {
        ...state,
        authenticated: !!action.payload,
        pending: false,
        loading: false,
        user: action.payload
      }
    case Actions.SIGNIN_EMAIL_REQUESTED:
    case Actions.SIGNUP_EMAIL_REQUESTED:
    case Actions.SIGNOUT_REQUESTED:
    case Actions.FORGOT_REQUESTED:
      return {
        ...state,
        pending: true
      }
    case Actions.EDIT_PROFILE_REQUESTED:
      return {
        ...state,
        pending: true,
        user: action.payload,
      }
    case Actions.LOAD_PROFILE:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}

// auth store
import { registerAction, Reducers, Actions, dispatch, Handlers } from '../../rxdux'
import rs from 'randomstring'

// actions
registerAction('USER_CHANGED')
registerAction('SIGNIN_EMAIL_REQUESTED')
registerAction('SIGNUP_EMAIL_REQUESTED')
registerAction('SIGNUP_FACEBOOK_REQUESTED');
registerAction('SIGNUP_CREATE_PROFILE_REQUESTED');
registerAction('SIGNOUT_REQUESTED')
registerAction('FORGOT_REQUESTED')
registerAction('EDIT_PROFILE_REQUESTED')
registerAction('PROFILE_CHANGED')
registerAction('PROFILE_KEYS_CHANGED')

// handlers
// UI handlers
// user requested signup with email and password
Handlers.requestSignup = fields => dispatch(Actions.SIGNUP_EMAIL_REQUESTED, fields)
// user requesting Fb signup
Handlers.requestFacebookSignup = () => dispatch(Actions.SIGNUP_FACEBOOK_REQUESTED);
// user requesting to create a profile
Handlers.requestCreateProfile = fields => dispatch(Actions.SIGNUP_CREATE_PROFILE_REQUESTED, fields);

// user requested login with email and password
Handlers.requestLogin = fields => dispatch(Actions.SIGNIN_EMAIL_REQUESTED, fields)
// user requested recovery of the password on email
Handlers.requestForgot = fields => dispatch(Actions.FORGOT_REQUESTED, fields)
// user requests to signout
Handlers.requestSignout = () => dispatch(Actions.SIGNOUT_REQUESTED)

// user request to edit profile
// _modif_ temporary workaround for profileLoaded -> true when noting changed on update
// TODO -> send mutation only if something really changed
Handlers.requestEditProfile = fields => dispatch(Actions.EDIT_PROFILE_REQUESTED, {...fields, _modif_: rs.generate(7)})

// Services handlers
// authenticate user or signout user if null
Handlers.userChanged = user => dispatch(Actions.USER_CHANGED, user)
// profile data changed
Handlers.profileChanged = profile => dispatch(Actions.PROFILE_CHANGED, profile)
Handlers.profileKeysChanged = profile => dispatch(Actions.PROFILE_KEYS_CHANGED, profile)

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
  // userLoaded stands for initial fetching of auth state status from Firebase
  authenticated: false,
  pending: false,
  userLoaded: false,
  profileLoaded: false,
  user: {},
  profile: {}
}

Reducers.auth = (state = initialState, action) => {
  switch (action.type) {
    case Actions.USER_CHANGED:
      return {
        ...state,
        authenticated: !!action.payload,
        pending: false,
        userLoaded: true,
        user: action.payload || {}
      }
    case Actions.PROFILE_CHANGED:
      return {
        ...state,
        profileLoaded: true,
        profile: action.payload || {}
      }
    case Actions.PROFILE_KEYS_CHANGED:
      return {
        ...state,
        profileLoaded: true,
        profile: {...state.profile, ...action.payload}
      }
    case Actions.SIGNIN_EMAIL_REQUESTED:
    case Actions.SIGNUP_EMAIL_REQUESTED:
    case Actions.SIGNUP_FACEBOOK_REQUESTED:
    case Actions.SIGNOUT_REQUESTED:
    case Actions.FORGOT_REQUESTED:
      return {
        ...state,
        pending: true
      }
    case Actions.EDIT_PROFILE_REQUESTED:
      return {
        ...state,
        profileLoaded: false,
        pending: true
      }
    default:
      return state
  }
}

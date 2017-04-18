// auth store
import { Actions, dispatch, Handlers } from '../../rxdux'
import rs from 'randomstring'

// handlers
// UI handlers
// user requested signup with email and password
Handlers.requestSignup = fields => dispatch(Actions.SIGNUP_EMAIL_REQUESTED, fields)
// user requesting Fb signup
Handlers.requestFacebookSignup = () => dispatch(Actions.SIGNUP_FACEBOOK_REQUESTED)
// user requesting to create a profile
Handlers.requestCreateProfile = fields => dispatch(Actions.SIGNUP_CREATE_PROFILE_REQUESTED, fields)

// user write to his profile or profile changed
Handlers.writeToProfile = fields => dispatch(Actions.WRITE_TO_PROFILE, fields)

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
Handlers.userChanged = uid => dispatch(Actions.USER_CHANGED, uid)
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
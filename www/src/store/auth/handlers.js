// auth store
import { Actions, dispatch, Handlers } from '../../rxdux'
import rs from 'randomstring'
import { isEmpty } from '../../components/utils'

// handlers
// UI handlers
// user requested signup with email and password
Handlers.requestSignUp = fields => dispatch(Actions.SIGNUP_EMAIL_REQUESTED, fields)
// user requesting Fb signup
Handlers.requestFacebook = () => dispatch(Actions.SIGN_FACEBOOK_REQUESTED)
// user requesting Gl signup
Handlers.requestGoogle = () => dispatch(Actions.SIGN_GOOGLE_REQUESTED)
// user requesting Fb signup
Handlers.linkFacebook = () => dispatch(Actions.LINK_FACEBOOK_REQUESTED)
// user requesting Gl signup
Handlers.linkGoogle = () => dispatch(Actions.LINK_GOOGLE_REQUESTED)

// user requested signin with email and password
Handlers.requestSignIn = fields => dispatch(Actions.SIGNIN_EMAIL_REQUESTED, fields)
// user requested recovery of the password on email
Handlers.requestForgot = fields => dispatch(Actions.FORGOT_REQUESTED, fields)
// user requested to set up the new password
Handlers.requestReset = fields => dispatch(Actions.RESET_PASSWORD_REQUESTED, fields)

// user requests to complete the profile once all the sign-up steps have been followed
Handlers.requestCompleteProfile = fields => dispatch(Actions.COMPLETE_PROFILE_REQUESTED, fields);

// user requests to signout
Handlers.requestSignout = () => dispatch(Actions.SIGNOUT_REQUESTED)
// user requesting to create a profile
Handlers.requestCreateProfile = fields => dispatch(Actions.SIGNUP_CREATE_PROFILE_REQUESTED, fields)
// profile data changed
Handlers.profileChanged = profile => dispatch(Actions.PROFILE_CHANGED, profile)
// profile data changed
Handlers.profileKeysChanged = fields => fields && !isEmpty(fields) && dispatch(Actions.PROFILE_KEYS_CHANGED, fields)
// user write to his profile or profile changed
Handlers.writeToProfile = fields => fields && !isEmpty(fields) && dispatch(Actions.WRITE_TO_PROFILE, fields)

// user request to edit profile
// _modif_ temporary workaround for loaded -> true when noting changed on update
// TODO -> send mutation only if something really changed
Handlers.requestEditProfile = fields => dispatch(Actions.EDIT_PROFILE_REQUESTED, {...fields, _modif_: rs.generate(7)})

// messages to forms and alerts with auth types: isError, isOk, isWarning, isInfo
// routes param is an array with the pathnames of the routes to show the message
// error message
Handlers.errorUser = (id, title, { message }, timeOut) => {
  id && title && Handlers.addToastr({
    id,
    title,
    message: message || 'Unknown error',
    type: 'error',
    options: {
      showCloseButton: true,
      timeOut: timeOut || 17000
    }})
  Handlers.profileKeysChanged({
    loaded: true
  })
}
// success
Handlers.okUser = (id, title, message, timeOut) => {
  id && title && Handlers.addToastr({
    id,
    title,
    message,
    type: 'success',
    options: {
      showCloseButton: true,
      timeOut: timeOut || 12000
    }})
}

// auth store
import { registerAction, Reducers, Actions } from '../../rxdux'

registerAction('SIGNOUT_REQUESTED')
registerAction('FORGOT_REQUESTED')
registerAction('SIGNIN_EMAIL_REQUESTED')
registerAction('SIGNUP_EMAIL_REQUESTED')
registerAction('SIGN_FACEBOOK_REQUESTED')
registerAction('SIGN_GOOGLE_REQUESTED')
registerAction('RESET_PASSWORD_REQUESTED')
registerAction('PROFILE_KEYS_CHANGED')
registerAction('LINK_FACEBOOK_REQUESTED')
registerAction('LINK_GOOGLE_REQUESTED')
registerAction('WRITE_TO_PROFILE')
registerAction('PROFILE_CHANGED')

// reducer
const initialState = {}

Reducers.auth = (state = initialState, action) => {
  switch (action.type) {
    case Actions.PROFILE_CHANGED:
      return {
        ...action.payload,
        loaded: true,
        appLoaded: true
      }
    case Actions.WRITE_TO_PROFILE:
    case Actions.PROFILE_KEYS_CHANGED:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SIGNIN_EMAIL_REQUESTED:
    case Actions.SIGNUP_EMAIL_REQUESTED:
    case Actions.SIGN_FACEBOOK_REQUESTED:
    case Actions.SIGN_GOOGLE_REQUESTED:
    case Actions.LINK_FACEBOOK_REQUESTED:
    case Actions.LINK_GOOGLE_REQUESTED:
    case Actions.EDIT_PROFILE_REQUESTED:
    case Actions.FORGOT_REQUESTED:
    case Actions.SIGNOUT_REQUESTED:
      return {
        ...state,
        loaded: false
      }
    default:
      return state
  }
}

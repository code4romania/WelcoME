// auth store
import { registerAction, Reducers, Actions } from '../../rxdux'

// emitted when a user is loggedin or logged out
registerAction('USER_CHANGED')
registerAction('SIGNOUT_REQUESTED')

registerAction('SIGNIN_EMAIL_REQUESTED')
registerAction('SIGNUP_EMAIL_REQUESTED')
registerAction('SIGNUP_FACEBOOK_REQUESTED')
registerAction('SIGNUP_GOOGLE_REQUESTED')
registerAction('SIGNUP_CREATE_PROFILE_REQUESTED')
registerAction('WRITE_TO_PROFILE')
registerAction('FORGOT_REQUESTED')
registerAction('EDIT_PROFILE_REQUESTED')
registerAction('PROFILE_CHANGED')
registerAction('PROFILE_KEYS_CHANGED')

// reducer
const initialState = {
  // userLoaded stands for initial fetching of auth state status from Firebase
  uid: null,
  userLoaded: false,

  pending: false,

  profileLoaded: false,
  user: {},
  profile: {}
}

Reducers.auth = (state = initialState, action) => {
  switch (action.type) {
    case Actions.USER_CHANGED:
      return {
        ...state,
        uid: action.payload,
        userLoaded: true
      }
    case Actions.WRITE_TO_PROFILE:
    case Actions.SIGNIN_EMAIL_REQUESTED:
    case Actions.SIGNUP_EMAIL_REQUESTED:
    case Actions.SIGNUP_FACEBOOK_REQUESTED:
    case Actions.SIGNUP_GOOGLE_REQUESTED:
    case Actions.SIGNOUT_REQUESTED:
    case Actions.FORGOT_REQUESTED:
      return {
        ...state,
        pending: true
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

// auth store
import { registerAction, Reducers, Actions } from '../../rxdux'

registerAction('SIGNOUT_REQUESTED')
registerAction('FORGOT_REQUESTED')
registerAction('SIGNIN_EMAIL_REQUESTED')
registerAction('SIGNUP_EMAIL_REQUESTED')
registerAction('SIGN_FACEBOOK_REQUESTED')
registerAction('SIGN_GOOGLE_REQUESTED')
registerAction('RESET_PASSWORD_REQUESTED')
registerAction('LOADED_CHANGED')

registerAction('WRITE_TO_PROFILE')
registerAction('PROFILE_CHANGED')

registerAction('SIGNUP_CREATE_PROFILE_REQUESTED')

registerAction('EDIT_PROFILE_REQUESTED')

// reducer
const initialState = {
  // userLoaded stands for initial fetching of auth state status from Firebase
  uid: null,
  loaded: false
}

Reducers.auth = (state = initialState, action) => {
  switch (action.type) {
    case Actions.PROFILE_CHANGED:
      return {
        loaded: true,
        ...action.payload
      }
    case Actions.LOADED_CHANGED:
      return {
        ...state,
        loaded: !!action.payload
      }

    case Actions.SIGNIN_EMAIL_REQUESTED:
    case Actions.SIGNUP_EMAIL_REQUESTED:
    case Actions.SIGN_FACEBOOK_REQUESTED:
    case Actions.SIGN_GOOGLE_REQUESTED:
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

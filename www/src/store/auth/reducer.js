// auth store
import { registerAction, Reducers, Actions, dispatch, Handlers } from '../../rxdux'

// actions
registerAction('AUTH_USER')
registerAction('AUTH_ERROR')
registerAction('SIGNIN_EMAIL_REQUESTED')
registerAction('SIGNUP_EMAIL_REQUESTED')
registerAction('SIGNOUT_REQUESTED')
registerAction('FORGOT_REQUESTED')

// handlers
Handlers.requestLogin = fields => dispatch(Actions.SIGNIN_EMAIL_REQUESTED, fields)
Handlers.requestSignup = fields => dispatch(Actions.SIGNUP_EMAIL_REQUESTED, fields)
Handlers.requestForgot = fields => dispatch(Actions.FORGOT_REQUESTED, fields)
Handlers.requestSignout = () => dispatch(Actions.SIGNOUT_REQUESTED)
Handlers.authUser = user => dispatch(Actions.AUTH_USER, user)
Handlers.errorUser = error => dispatch(Actions.AUTH_ERROR, error)

// reducer
const initialState = {}
Reducers.auth = (state = initialState, action) => {
  switch (action.type) {
    case Actions.AUTH_USER:
      return {
        ...state,
        authenticated: !!action.payload,
        pending: false,
        user: action.payload,
        error: null
      }
    case Actions.AUTH_ERROR:
      return {
        ...state,
        authenticated: false,
        pending: false,
        user: null,
        error: action.payload
      }
    case Actions.SIGNIN_EMAIL_REQUESTED:
    case Actions.SIGNUP_EMAIL_REQUESTED:
      return {
        ...state,
        pending: true,
        error: null
      }
    case Actions.SIGNOUT_REQUESTED:
    case Actions.FORGOT_REQUESTED:
    default:
      return state
  }
}

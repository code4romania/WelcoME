// auth store
import { registerAction, Reducers, Actions, dispatch, Handlers } from '../../rxdux'
import { transformUser } from './helpers'
// actions
registerAction('AUTH_USER')
registerAction('AUTH_MESSAGE')
registerAction('SIGNIN_EMAIL_REQUESTED')
registerAction('SIGNUP_EMAIL_REQUESTED')
registerAction('SIGNOUT_REQUESTED')
registerAction('FORGOT_REQUESTED')

// handlers
// user requested signup with email and password
Handlers.requestSignup = fields => dispatch(Actions.SIGNUP_EMAIL_REQUESTED, fields)
// user requested login with email and password
Handlers.requestLogin = fields => dispatch(Actions.SIGNIN_EMAIL_REQUESTED, fields)

Handlers.requestForgot = fields => dispatch(Actions.FORGOT_REQUESTED, fields)

// user requests to signout
Handlers.requestSignout = () => dispatch(Actions.SIGNOUT_REQUESTED)

Handlers.authUser = user => dispatch(Actions.AUTH_USER, user)
// send error message to inform user
Handlers.errorUser = (error, forms) => dispatch(Actions.AUTH_MESSAGE, {...error, isError: true, forms})
// send other type of message other then error to inform user
Handlers.okUser = (message, forms, type = { isOk: true }) => dispatch(Actions.AUTH_MESSAGE, { message, ...type, forms })

// reducer
const initialState = {}
Reducers.auth = (state = initialState, action) => {
  switch (action.type) {
    case Actions.AUTH_USER:
      return {
        ...state,
        authenticated: !!action.payload,
        pending: false,
        user: transformUser(action.payload),
        message: null
      }
    case Actions.AUTH_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    case Actions.SIGNIN_EMAIL_REQUESTED:
    case Actions.SIGNUP_EMAIL_REQUESTED:
      return {
        ...state,
        pending: true,
        message: null
      }
    case Actions.SIGNOUT_REQUESTED:
    case Actions.FORGOT_REQUESTED:
    default:
      return state
  }
}

// auth store
import Rx from 'rxjs'
import Rxdux from '../rxdux'

// actions
Rxdux.addActionType('AUTH_USER')
Rxdux.addActionType('AUTH_ERROR')
Rxdux.addActionType('AUTH_REQUESTED')
Rxdux.addActionType('SIGNUP_REQUESTED')
Rxdux.addActionType('SIGNOUT_REQUESTED')
Rxdux.addActionType('FORGOT_REQUESTED')

// reducers
const authRequested$ = Rxdux
  .getPayload(Rxdux.actions.AUTH_REQUESTED)
  .mapTo({pending: true, error: null})
const forgotRequested$ = Rxdux
  .getPayload(Rxdux.actions.FORGOT_REQUESTED)
  .mapTo({pending: true, error: null})
const signupRequested$ = Rxdux
  .getPayload(Rxdux.actions.SIGNUP_REQUESTED)
  .mapTo({pending: true, error: null})
const signoutRequested$ = Rxdux
  .getPayload(Rxdux.actions.SIGNOUT_REQUESTED)
  .mapTo({})
const authError$ = Rxdux
  .getPayload(Rxdux.actions.AUTH_ERROR)
  .map(error => ({authenticated: false, pending: false, user: null, error: error}))
const authUser$ = Rxdux
  .getPayload(Rxdux.actions.AUTH_USER)
  .map(user => ({
    authenticated: !!user,
    pending: false,
    user,
    error: null
  }))

export default Rx
  .Observable
  .merge(authRequested$, forgotRequested$, signupRequested$, authError$, authUser$, signoutRequested$)
  .scan((state, currentState) => ({
    ...state,
    ...currentState
  }))
  .startWith({
    authenticated: false,
    user: null,
    profile: {
      received: false,
      name: '',
      surname: ''
    },
    pending: true,
    error: null
  })
  .map(auth => ({
    auth: {
      ...auth,
      signOut: () => Rxdux.dispatch(Rxdux.actions.SIGNOUT_REQUESTED),
      requestLogin: fields => Rxdux.dispatch(Rxdux.actions.AUTH_REQUESTED, fields),
      requestForgot: fields => Rxdux.dispatch(Rxdux.actions.FORGOT_REQUESTED, fields),
      requestSignup: fields => Rxdux.dispatch(Rxdux.actions.SIGNUP_REQUESTED, fields)
    }
  }))

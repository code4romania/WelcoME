import Rxdux from '../rxdux'
// import { Observable } from 'rxjs'

// clean up login forms on authentication
Rxdux.getAction(
  Rxdux.actions.AUTH_USER
).subscribe(() => Rxdux.dispatch(Rxdux.actions.FIELDS_CHANGED, {
  email: null,
  password: null,
  passwordConfirmation: null
}))

// clean up password fields on every request
Rxdux.getAction(
  Rxdux.actions.AUTH_REQUESTED,
  Rxdux.actions.SIGNUP_REQUESTED,
  Rxdux.actions.FORGET_REQUESTED
).subscribe(() => Rxdux.dispatch(Rxdux.actions.FIELDS_CHANGED, {
  password: null,
  passwordConfirmation: null
}))

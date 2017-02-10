import Rxdux from '../rxdux'
// import { Observable } from 'rxjs'
import Firebase from '../firebase'

// on auth sync store
Firebase
  .auth()
  .onAuthStateChanged(user => Rxdux.dispatch(Rxdux.actions.AUTH_USER, user),
    error => Rxdux.dispatch(Rxdux.actions.AUTH_ERROR, error))

// signout user
Rxdux.getAction(
  Rxdux.actions.SIGNOUT_REQUESTED
).subscribe(() => {
  Firebase.auth().signOut()
  Rxdux.dispatch(Rxdux.actions.ROUTE_REQUESTED, '/')
})

// clean up login forms on authentication
Rxdux.getAction(
  Rxdux.actions.AUTH_USER
).subscribe(() => Rxdux.dispatch(Rxdux.actions.FIELDS_CHANGED, {
  email: null,
  password: null,
  password1: null,
  password2: null
}))

// clean up password fields on every request
Rxdux.getAction(
  Rxdux.actions.AUTH_REQUESTED,
  Rxdux.actions.SIGNUP_REQUESTED,
  Rxdux.actions.FORGET_REQUESTED
).subscribe(() => Rxdux.dispatch(Rxdux.actions.FIELDS_CHANGED, {
  password: null,
  password1: null,
  password2: null
}))

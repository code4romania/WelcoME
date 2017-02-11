import { Handlers, actions$, Actions } from '../rxdux'
// import { Observable } from 'rxjs'
import Firebase from '../firebase'

// on auth sync store
Firebase
  .auth()
  .onAuthStateChanged(Handlers.authUser, Handlers.errorUser)

// signout user
actions$(Actions.SIGNOUT_REQUESTED).subscribe(Handlers.signOut)

// clean up login forms on authentication
actions$(Actions.AUTH_USER).subscribe(() => Handlers.changeFields({
  email: null,
  password: null,
  password1: null,
  password2: null
}))

// clean up password fields on every request
actions$(Actions.AUTH_REQUESTED, Actions.SIGNUP_REQUESTED, Actions.FORGET_REQUESTED).subscribe(() => Handlers.changeFields({
  password: null,
  password1: null,
  password2: null
}))

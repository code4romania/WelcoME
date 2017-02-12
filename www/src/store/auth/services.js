import { Handlers, actions$, Actions, payloads$ } from '../../rxdux'
import { Observable } from 'rxjs'
import Firebase from '../../firebase'

// on auth sync store
Firebase
  .auth()
  .onAuthStateChanged(Handlers.authUser, Handlers.errorUser)

// login with email requested
payloads$(Actions.SIGNIN_EMAIL_REQUESTED)
  .switchMap(fields => Observable.fromPromise(Firebase.auth().signInWithEmailAndPassword(fields.email, fields.password))
                        .catch(Observable.of))
  .subscribe(userOrError => userOrError.uid ? Handlers.authUser(userOrError) : Handlers.errorUser(userOrError))

// signup with email requested
payloads$(Actions.SIGNUP_EMAIL_REQUESTED)
  .switchMap(fields => Observable.fromPromise(Firebase.auth().createUserWithEmailAndPassword(fields.email, fields.password1))
                        .catch(Observable.of))
  .subscribe(userOrError => userOrError.uid ? Handlers.authUser(userOrError) : Handlers.errorUser(userOrError))

// signup with email requested
payloads$(Actions.FORGOT_REQUESTED)
  .switchMap(fields => Observable.fromPromise(Firebase.auth().sendPasswordResetEmail(fields.email, fields.password))
                        .catch(Observable.of))
  .subscribe(userOrError => userOrError.uid ? Handlers.authUser(userOrError) : Handlers.errorUser(userOrError))

// signout user requested
payloads$(Actions.SIGNOUT_REQUESTED).subscribe(() => {
  Handlers.goToPath('/')
  Firebase.auth().signOut()
})

// clean up login forms on authentication
actions$(Actions.AUTH_USER).subscribe(() => Handlers.changeFields({
  email: null,
  password: null,
  password1: null,
  password2: null
}))

// clean up password fields on every request
actions$(Actions.SIGNUP_EMAIL_REQUESTED, Actions.SIGNIN_EMAIL_REQUESTED, Actions.FORGOT_REQUESTED).subscribe(() => Handlers.changeFields({
  password: null,
  password1: null,
  password2: null
}))

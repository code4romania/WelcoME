import { Handlers, actions$, Actions, payloads$ } from '../../rxdux'
import { FirebaseAuth } from '../../firebase'
import { transformUser } from './helpers'
// on auth sync store
FirebaseAuth.onAuthStateChanged(user => {
  user = transformUser(user)
  Handlers.authUser(user)
  user && Handlers.okUser('auth', 'Welcome', `${user.email}`)
}, err => Handlers.errorUser('auth', 'Sign In', err))

// signup with email requested
payloads$(Actions.SIGNUP_EMAIL_REQUESTED)
  .subscribe(fields => {
    FirebaseAuth.createUserWithEmailAndPassword(fields.email, fields.password1)
       .then(user => user.sendEmailVerification())
       .then(() => Handlers.okUser('signup', 'An email was sent at', `${fields.email} for verifying the password`))
       .catch(err => Handlers.errorUser('auth', 'Sign Up', err))
  })

// login with email requested
payloads$(Actions.SIGNIN_EMAIL_REQUESTED)
  .subscribe(fields => {
    FirebaseAuth.signInWithEmailAndPassword(fields.email, fields.password)
        .catch(err => Handlers.errorUser('auth', 'Sign In', err))
  })

// forgot password requested
payloads$(Actions.FORGOT_REQUESTED)
  .subscribe(fields => {
    FirebaseAuth.sendPasswordResetEmail(fields.email)
        .then(() => Handlers.okUser('signup', 'An email was sent at', `${fields.email} for resetting the password`))
        .catch(err => Handlers.errorUser('auth', 'Reset password', err))
  })

// signout user requested
payloads$(Actions.SIGNOUT_REQUESTED).subscribe(() => {
  Handlers.goToPath('/')
  const user = transformUser(FirebaseAuth.currentUser)
  FirebaseAuth.signOut()
  .then(() => Handlers.okUser('auth', 'Good bye', `${user.email}`))
  .catch(err => Handlers.errorUser('auth', 'Sign Out', err))
})

// clean up forms fields on every request
actions$(
  Actions.AUTH_USER,
  Actions.SIGNUP_EMAIL_REQUESTED,
  Actions.SIGNIN_EMAIL_REQUESTED,
  Actions.FORGOT_REQUESTED,
  Actions.SIGNOUT_REQUESTED
).subscribe(() => Handlers.changeFields({
  email: null,
  password: null,
  password1: null,
  password2: null
}))

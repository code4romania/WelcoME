import { Handlers, actions$, Actions, payloads$ } from '../../rxdux'
import { FirebaseAuth } from '../../firebase'

// on auth sync store
FirebaseAuth.onAuthStateChanged(user => Handlers.authUser(user), err => Handlers.errorUser(err, ['signup', 'login', 'forgot', 'general']))

// signup with email requested
payloads$(Actions.SIGNUP_EMAIL_REQUESTED)
  .subscribe(fields => {
    FirebaseAuth.createUserWithEmailAndPassword(fields.email, fields.password1)
       .then(user => user.sendEmailVerification())
       .then(() => Handlers.okUser(`An email was sent at ${fields.email} for verifying the password`, ['signup']))
       .catch(err => Handlers.errorUser(err, ['signup']))
  })

// login with email requested
payloads$(Actions.SIGNIN_EMAIL_REQUESTED)
  .subscribe(fields => {
    FirebaseAuth.signInWithEmailAndPassword(fields.email, fields.password)
        .catch(err => Handlers.errorUser(err, ['login']))
  })

// forgot password requested
payloads$(Actions.FORGOT_REQUESTED)
  .subscribe(fields => {
    FirebaseAuth.sendPasswordResetEmail(fields.email)
        .then(() => Handlers.okUser(`An email was sent at ${fields.email} for resetting the password`, ['forgot']))
        .catch(err => Handlers.errorUser(err, ['forgot']))
  })

// signout user requested
payloads$(Actions.SIGNOUT_REQUESTED).subscribe(() => {
  Handlers.goToPath('/')
  FirebaseAuth.signOut().catch(err => Handlers.errorUser(err, ['general']))
})

// clean up forms fields on every request
actions$(Actions.AUTH_USER, Actions.SIGNUP_EMAIL_REQUESTED, Actions.SIGNIN_EMAIL_REQUESTED, Actions.FORGOT_REQUESTED)
 .subscribe(() => Handlers.changeFields({
   email: null,
   password: null,
   password1: null,
   password2: null
 }))

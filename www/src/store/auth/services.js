import { Handlers, actions$, Actions, payloads$ } from '../../rxdux'
import { FirebaseAuth, FirebaseDb } from '../../firebase'
import { transformUser } from './helpers'

// auth and db global observers
// here will unsubscribe and subscribe to all keys when user changes
// for now only profile will be extracted from 'users/uid' key

// TODO mre elegant is to distinctUntilChanged on state$ stream
// without keeping track of lastUid
let lastUid
const updateUserObservers = uid => {
  // same user
  if (uid && lastUid && (uid === lastUid)) {
    return
  }
  // unsubscribe old observers
  if (lastUid) {
    FirebaseDb.ref('/users/' + lastUid).off('value')
  }
  // subscribe new observers
  if (uid) {
    FirebaseDb.ref('/users/' + uid).on('value', snapshot => Handlers.profileChanged(snapshot.val()))
  }
  lastUid = uid
}

// on user changed sync it with store
FirebaseAuth.onAuthStateChanged(user => {
  user = transformUser(user)
  updateUserObservers(user && user.uid)
  Handlers.userChanged(user)
  user && Handlers.okUser('auth', 'Welcome', `${user.email}`)
}, err => Handlers.errorUser('auth', 'Sign In', err))

// signup with email requested
payloads$(Actions.SIGNUP_EMAIL_REQUESTED)
  .subscribe(fields => {
    FirebaseAuth
      .createUserWithEmailAndPassword(fields.email, fields.password1)
      .then(user => user.sendEmailVerification())
      .then(() => Handlers.goToPath('/'))
      .then(() => Handlers.okUser('signup', 'An email was sent at', `${fields.email} for verifying the password`))
      .catch(err => Handlers.errorUser('auth', 'Sign Up', err))
  })

// login with email requested
payloads$(Actions.SIGNIN_EMAIL_REQUESTED)
  .subscribe(fields => {
    FirebaseAuth
      .signInWithEmailAndPassword(fields.email, fields.password)
      .then(() => Handlers.goToPath('/'))
      .catch(err => Handlers.errorUser('auth', 'Sign In', err))
  })

// forgot password requested
payloads$(Actions.FORGOT_REQUESTED)
  .subscribe(fields => {
    FirebaseAuth
      .sendPasswordResetEmail(fields.email)
      .then(() => Handlers.goToPath('/login'))
      .then(() => Handlers.okUser('signup', 'An email was sent at', `${fields.email} for resetting the password`))
      .catch(err => Handlers.errorUser('auth', 'Reset password', err))
  })

// signout user requested
payloads$(Actions.SIGNOUT_REQUESTED).subscribe(() => {
  Handlers.goToPath('/')
  const user = transformUser(FirebaseAuth.currentUser)
  FirebaseAuth
    .signOut()
    .then(() => Handlers.okUser('auth', 'Good bye', `${user.email}`))
    .catch(err => Handlers.errorUser('auth', 'Sign Out', err))
})

// edit profile requested
payloads$(Actions.EDIT_PROFILE_REQUESTED)
  .subscribe((fields) => {
    const user = FirebaseAuth.currentUser
    FirebaseDb
      .ref('users/' + user.uid).set(fields)
      .then(() => Handlers.okUser('editProfile', 'Profile updated for', `${user.email}`))
      .catch(err => Handlers.errorUser('editProfile', 'Profile not updated..', err))
  })

// clean up forms fields on every request
actions$(
  Actions.USER_CHANGED,
  Actions.SIGNUP_EMAIL_REQUESTED,
  Actions.SIGNIN_EMAIL_REQUESTED,
  Actions.FORGOT_REQUESTED,
  Actions.SIGNOUT_REQUESTED
).subscribe(() => Handlers.clearFields())

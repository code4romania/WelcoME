import { Handlers, actions$, Actions, payloads$ } from '../../rxdux'
import { FirebaseAuth, FirebaseDb } from '../../firebase'
import { transformUser } from './helpers'

// on auth sync store
FirebaseAuth.onAuthStateChanged(user => {
  user = transformUser(user);
  Handlers.authUser(user);
  Handlers.loadProfile(user);
  user && Handlers.okUser('auth', 'Welcome', `${user.email}`);
}, err => Handlers.errorUser('auth', 'Sign In', err))

payloads$(Actions.LOAD_PROFILE)
  .subscribe(user => {
    FirebaseDb.ref('/users/' + user.uid).once('value').then(snapshot => {
      user.firstName = snapshot.val().firstName;
      user.lastName = snapshot.val().lastName;
    });
  });

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

payloads$(Actions.EDIT_PROFILE_REQUESTED)
  .subscribe((fields) => {
    const user = FirebaseAuth.currentUser;

    FirebaseDb
      .ref('users/' + user.uid).set({
        firstName: fields.firstName,
        lastName: fields.lastName,
      })
      .then(() => Handlers.authUser(transformUser(user)))
      .then(() => Handlers.okUser('editProfile', 'Profile updated for', `${user.email}`))
      .then(() => Handlers.goToPath('/'))
      .catch(err => Handlers.errorUser('editProfile', 'Profile not updated..', err));
  })

// clean up forms fields on every request
actions$(
  Actions.AUTH_USER,
  Actions.SIGNUP_EMAIL_REQUESTED,
  Actions.SIGNIN_EMAIL_REQUESTED,
  Actions.FORGOT_REQUESTED,
  Actions.SIGNOUT_REQUESTED,
).subscribe(() => Handlers.changeFields({
  email: null,
  password: null,
  password1: null,
  password2: null
}))

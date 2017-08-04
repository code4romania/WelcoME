import {
  Handlers,
  Actions,
  payloads$,
  store$
} from '../../rxdux'
import {
  FirebaseFetch,
  FirebaseAuth,
  FirebaseDb,
  FacebookProvider,
  GoogleProvider
} from '../../firebase'
import { getCredentialKey } from './helpers'
import rs from 'randomstring'
import { Entities, Locale } from '../constants.js'

// import { Entities } from '../constants'
// on user changed observe users/uid key for changes
let lastUid = rs.generate(3)

FirebaseAuth.onAuthStateChanged(user => {
  const uid = user && user.uid
  if (lastUid !== uid) {
    uid && Handlers.clearFields('signup')
    lastUid && FirebaseDb.ref('/users/' + lastUid).off('value')
    lastUid = uid
    uid
      ? FirebaseDb.ref('/users/' + uid).on('value', snapshot => Handlers.profileChanged(snapshot.val()))
      : Handlers.profileChanged()
  }
  uid && Handlers.okUser('auth', 'Welcome', `${user.email}`)
}, err => Handlers.errorUser('auth', 'Sign In', err))

// user is cancelled from DB, have to force signout
store$.map(state => state.auth.uid).bufferCount(2, 1)
  .filter(([lastUid, uid]) => lastUid && !uid)
  .subscribe(([lastUid, uid]) => FirebaseAuth.currentUser && Handlers.requestSignout())

payloads$(Actions.RESET_PASSWORD_REQUESTED)
  .subscribe(fields => {
    FirebaseFetch('tryCode', {
      mode: 'resetPassword',
      code: fields.oobCode,
      email: fields.email,
      extra: { password: fields.password }
    })
    .then(res => {
      Handlers.okUser('verify', `Password has been changed.`)
      const user = FirebaseAuth.currentUser
      Handlers.goToPath(user.type ? '/feed' : '/profile')
      return user
        ? FirebaseAuth.signOut().then(() => FirebaseAuth.signInWithCustomToken(res.customToken))
        : FirebaseAuth.signInWithCustomToken(res.customToken)
    })
    .catch(err => {
      Handlers.errorUser('reset', 'Reset password', err)
      Handlers.goToPath('/signin')
    })
  })

// when email verified
payloads$(Actions.ROUTE_CHANGED)
  .filter(route => route.pathname === '/actions' && route.mode === 'verifyEmail' && route.email && route.oobCode)
  .subscribe(route => {
    FirebaseFetch('tryCode', {
      mode: 'verifyEmail',
      code: route.oobCode,
      email: route.email
    })
    .then(res => {
      Handlers.okUser('verify', `Email address ${res.email} has been verified.`)
      return FirebaseAuth.currentUser
        ? FirebaseAuth.signOut().then(() => FirebaseAuth.signInWithCustomToken(res.customToken))
        : FirebaseAuth.signInWithCustomToken(res.customToken)
    })
    .then(() => Handlers.goToPath(FirebaseAuth.currentUser.type ? '/feed' : '/profile'))
    .catch(err => Handlers.errorUser('verify', 'Verify email', err))
  })

// when route to reset password have to sign out
payloads$(Actions.ROUTE_CHANGED)
  .filter(route => route.pathname === '/resetPassword' && route.email && route.oobCode)
  .subscribe(route => FirebaseAuth.currentUser && FirebaseAuth.signOut())

// signout user requested
payloads$(Actions.SIGNOUT_REQUESTED).subscribe(() => {
  const user = FirebaseAuth.currentUser
  user && FirebaseAuth.signOut().then(() => {
    Handlers.okUser('auth', 'Good bye', `${user.email}`)
    Handlers.goToPath('/')
  }).catch(err => Handlers.errorUser('auth', 'Sign Out', err))
})


// login with email requested
payloads$(Actions.SIGNIN_EMAIL_REQUESTED)
  .subscribe(fields => {
    FirebaseAuth
      .signInWithEmailAndPassword(fields.email, fields.password)
      .then(user => Handlers.goToPath(user.type ? '/feed' : '/profile'))
      .catch(err => Handlers.errorUser('auth', 'Sign In', err))
  })

// signup with email requested
payloads$(Actions.SIGNUP_EMAIL_REQUESTED)
  .subscribe((fields) => {
    FirebaseAuth.createUserWithEmailAndPassword(fields.email, fields.password)
      .then(user => {
        Handlers.goToPath('/profile');
        console.log('SIGNUP_EMAIL_REQUESTED -- ...');
        console.log(user);
        return user;
      })
      .then(user => FirebaseFetch(
        'changeProfile',
        {
          uid: user.uid,
          type: Entities.userTypes.PENDING,
          // TODO here we send actual language from UI
          locale: Locale.EN,
          sendVerificationEmail: true,
        },
        user,
      ))
      .then(() => Handlers.okUser(
        'signup',
        'An email was sent at', `${fields.email}. Follow the link to enable your account.`,
      ))
      .catch(err => Handlers.errorUser('auth', 'Sign Up', err))
  })

// profile completed requested
payloads$(Actions.COMPLETE_PROFILE_REQUESTED)
  .subscribe((fields) => {
    const user = FirebaseAuth.currentUser;
    FirebaseFetch(
      'changeProfile',
      {
        type: fields.userType,
      },
      user,
    )
    .then(() => Handlers.okUser(
      'profile-completed',
      'Profile succesfully completed',
    ))
    .catch(err => Handlers.errorUser('profile-completed', 'Complete Profile', err))
  })

let stayOnProfile = false
// link with facebook
payloads$(Actions.LINK_FACEBOOK_REQUESTED).subscribe(() => {
  stayOnProfile = true
  FirebaseAuth.currentUser.linkWithRedirect(FacebookProvider)
      .catch(err => Handlers.errorUser('auth', 'Facebook', err))
})

// link with google
payloads$(Actions.LINK_GOOGLE_REQUESTED).subscribe(() => {
  stayOnProfile = true
  FirebaseAuth.currentUser.linkWithRedirect(GoogleProvider)
      .catch(err => Handlers.errorUser('auth', 'Google', err))
})

// signup with facebook
payloads$(Actions.SIGN_FACEBOOK_REQUESTED).subscribe(() => {
  FirebaseAuth.signInWithRedirect(FacebookProvider)
      .catch(err => Handlers.errorUser('auth', 'Facebook', err))
})

// signup with google
payloads$(Actions.SIGN_GOOGLE_REQUESTED).subscribe(() => {
  FirebaseAuth.signInWithRedirect(GoogleProvider)
      .catch(err => Handlers.errorUser('auth', 'Google', err))
})

// when redirect returns send credential to profile
FirebaseAuth.getRedirectResult().then(result => {
  console.log(result)
  if (result.user && result.credential) {
    Handlers.goToPath(!result.user.type || stayOnProfile ? '/profile' : '/feed')

    stayOnProfile = false
    FirebaseFetch('changeProfile', {
      [`${getCredentialKey(result.credential)}Credential`]: result.credential
    }, result.user)
  }
}).catch(err => Handlers.errorUser('auth', 'Redirect', err))

// modify profile
payloads$(Actions.WRITE_TO_PROFILE)
  .subscribe((profile) =>
    FirebaseFetch('changeProfile', profile, FirebaseAuth.currentUser)
    .catch(err => Handlers.errorUser('profile', 'Saving profile', err))
  )

// forgot password requested
payloads$(Actions.FORGOT_REQUESTED)
  .subscribe(fields => {
    FirebaseFetch('sendReset', {email: fields.email})
      .then(() => Handlers.goToPath('/signin'))
      .then(() => Handlers.profileKeysChanged({
        loaded: true
      }))
      .then(() => Handlers.okUser('signup', 'An email was sent at', `${fields.email} for resetting the password`))
      .catch(err => Handlers.errorUser('auth', 'Reset password', err))
  })

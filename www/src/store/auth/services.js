import { Handlers, Actions, payloads$, store$ } from '../../rxdux'
import { FirebaseFetch, FirebaseAuth, FirebaseDb, FacebookProvider, GoogleProvider } from '../../firebase'
import { getCredentialKey } from './helpers'
import rs from 'randomstring'

// import { Entities } from '../constants'

// on user changed observe users/uid key for changes
let lastUid = rs.generate(3)
FirebaseAuth.onAuthStateChanged(user => {
  const uid = user && user.uid
  if (lastUid !== uid) {
    Handlers.clearFields()
    lastUid && FirebaseDb.ref('/users/' + lastUid).off('value')
    lastUid = uid
    uid
      ? FirebaseDb.ref('/users/' + uid).on('value', snapshot => Handlers.profileChanged(snapshot.val()))
      : Handlers.profileChanged()
  }
  user && Handlers.okUser('auth', 'Welcome', `${user.email}`)
}, err => Handlers.errorUser('auth', 'Sign In', err))

// user is cancelled from DB, have to force signout
store$.map(state => state.auth.uid).bufferCount(2, 1)
  .filter(([lastUid, uid]) => lastUid && !uid)
  .subscribe(([lastUid, uid]) => FirebaseAuth.currentUser && Handlers.requestSignout())

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
      Handlers.okUser('verify', `Email address ${res.email} has been verified. Logging in...`)
      const user = FirebaseAuth.currentUser
      Handlers.goToPath('/')
      return user
        ? FirebaseAuth.signOut().then(() => FirebaseAuth.signInWithCustomToken(res.customToken))
        : FirebaseAuth.signInWithCustomToken(res.customToken)
    })
    .catch(err => Handlers.errorUser('verify', 'Verify email', err))
  })

// signout user requested
payloads$(Actions.SIGNOUT_REQUESTED).subscribe(() => {
  const user = FirebaseAuth.currentUser
  user && FirebaseAuth.signOut().then(() => {
    Handlers.okUser('auth', 'Good bye', `${user.email}`)
    Handlers.goToPath('/')
  }).catch(err => Handlers.errorUser('auth', 'Sign Out', err))
})

// signup with email requested
payloads$(Actions.SIGNUP_EMAIL_REQUESTED)
  .subscribe((fields) => {
    FirebaseAuth
      .createUserWithEmailAndPassword(fields.email, fields.password)
      .then(user => FirebaseFetch('changeProfile', {
        // TODO here we send actual language from UI
        lang: 'en',
        sendVerificationEmail: true
      }, user))
      .then(() => Handlers.okUser(
        'signup',
        'An email was sent at', `${fields.email}. Follow the link to enable your account.`,
      ))
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
  if (result.user && result.credential) {
    FirebaseFetch('changeProfile', {
      [`${getCredentialKey(result.credential)}Credential`]: result.credential
    }, result.user)
  }
  Handlers.goToPath('/')
}).catch(err => Handlers.errorUser('auth', 'Redirect', err))

// modify profile
payloads$(Actions.WRITE_TO_PROFILE)
  .subscribe((profile) => FirebaseFetch('changeProfile', profile, FirebaseAuth.currentUser))

// forgot password requested
payloads$(Actions.FORGOT_REQUESTED)
  .subscribe(fields => {
    FirebaseAuth
      .sendPasswordResetEmail(fields.email)
      .then(() => Handlers.goToPath('/login'))
      .then(() => Handlers.okUser('signup', 'An email was sent at', `${fields.email} for resetting the password`))
      .catch(err => Handlers.errorUser('auth', 'Reset password', err))
  })

/*

// signup with facebook
payloads$(Actions.SIGN_FACEBOOK_REQUESTED).subscribe(() => {
  FirebaseAuth.signInWithPopup(FacebookProvider)
      .then(result => FirebaseDb
          .ref('users/' + result.user.uid)
          .set({
            email: result.user.email,
            pendingProfile: true
          })
      )
      .then(() => Handlers.goToPath('/create_profile'))
      .catch(err => {
        console.log('panic!')
        console.log(err)
        // TODO: solve case where an account exitsts
      })
})

// signup with email requested
payloads$(Actions.SIGNUP_EMAIL_REQUESTED)
  .subscribe((fields) => {
    FirebaseAuth
      .createUserWithEmailAndPassword(fields.email, fields.password)
      .then(user => {
        user.sendEmailVerification()
        return user
      })
      .then(({uid, email}) => {
        FirebaseDb.ref('users/' + uid).set({
          email,
          emailPassword: true,
          pendingProfile: true
        })
        return uid
      })
      .then(() => Handlers.goToPath('/create_profile'))
      .then(() => Handlers.okUser(
        'signup',
        'An email was sent at', `${fields.email} for verifying the password`,
      ))
      .catch(err => Handlers.errorUser('auth', 'Sign Up', err))
  })

payloads$(Actions.SIGNUP_CREATE_PROFILE_REQUESTED)
  .subscribe((fields) => {
    const user = FirebaseAuth.currentUser
    const userTypeSpecificTable =
      fields.profiletype === Entities.userTypes.VOLUNTEER
        ? 'volunteers'
        : fields.profiletype === Entities.userTypes.REFUGEE
          ? 'refugees'
          : fields.profiletype === Entities.userTypes.ASYLUM_SEEKER
            ? 'asylum_seekers'
            : null

    FirebaseDb
      .ref('users/' + user.uid)
      .update({
        type: fields.profiletype,
        camp_admin: false,
        pendingProfile: false
      })
      .then(() => FirebaseDb
        .ref('users/' + user.uid + '/camps/' + fields.camp)
        .set(true)
      )
      .then(uid => {
        if (userTypeSpecificTable !== null) {
          FirebaseDb
            .ref(userTypeSpecificTable + '/' + fields.camp + '/' + user.uid)
            .set(true)
        }
      })
      .then(() => Handlers.goToPath('/'))
  })

// login with email requested
payloads$(Actions.SIGNIN_EMAIL_REQUESTED)
  .subscribe(fields => {
    FirebaseAuth
      .signInWithEmailAndPassword(fields.email, fields.password)
      .then(() => Handlers.goToPath('/'))
      .catch(err => Handlers.errorUser('auth', 'Sign In', err))
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

*/

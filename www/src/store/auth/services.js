import { Handlers, actions$, Actions, payloads$, store$ } from '../../rxdux'
import { FirebaseAuth, FirebaseDb } from '../../firebase'
import { transformUser } from './helpers'

// auth and db global observers

// here will unsubscribe and subscribe to all keys when user changes
store$
  .map(state => state.auth.user.uid)
  .bufferCount(2, 1)
  .filter(([lastUid, uid]) => uid !== lastUid)
  .subscribe(([lastUid, uid]) => {
    // unsubscribe old observers
    if (lastUid) {
      Handlers.profileChanged()
      FirebaseDb.ref('/users/' + lastUid).off('value')
      FirebaseDb.ref('/owners/' + lastUid).off('value')
      FirebaseDb.ref('/admins/' + lastUid).off('value')
    }
    // subscribe new observers
    if (uid) {
      FirebaseDb.ref('/users/' + uid).on('value', snapshot => Handlers.profileChanged(snapshot.val()))
      FirebaseDb.ref('/owners/' + uid).on('value', snapshot => Handlers.profileKeysChanged({ owner: !!snapshot.val() }))
      FirebaseDb.ref('/admins/' + uid).on('value', snapshot => Handlers.profileKeysChanged({ admin: !!snapshot.val() }))
    }
  })

// on user changed sync it with store
FirebaseAuth
  .onAuthStateChanged(
    user => {
      user = transformUser(user)
      Handlers.userChanged(user)
      user && Handlers.okUser('auth', 'Welcome', `${user.email}`)
    },
    err => Handlers.errorUser('auth', 'Sign In', err)
  )

// signup with email requested
payloads$(Actions.SIGNUP_EMAIL_REQUESTED)
  .subscribe(({email, password1, volunteer, camp}) => {
    FirebaseAuth
      .createUserWithEmailAndPassword(email, password1)
      .then(user => {
        user.sendEmailVerification()
        return user
      })
      .then(({uid, email}) => {
        FirebaseDb.ref('users/' + uid).set({
          email,
          volunteer: !!volunteer,
          refugee: !volunteer,
          owner: false,
          admin: false,
          camp,
          emailPassword: true
        })
        return uid
      })
      .then(uid => FirebaseDb.ref((volunteer ? 'volunteers/' : 'refugees/') + camp + '/' + uid).set(true))
      .then(() => Handlers.goToPath('/'))
      .then(() => Handlers.okUser('signup', 'An email was sent at', `${email} for verifying the password`))
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
payloads$(Actions.SIGNOUT_REQUESTED)
  .subscribe(() => {
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

// clean up forms fields when user changes
actions$(Actions.USER_CHANGED)
  .subscribe(() => Handlers.clearFields())

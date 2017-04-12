import { Handlers, actions$, Actions, payloads$, store$ } from '../../rxdux'
import { FirebaseAuth, FirebaseDb } from '../../firebase'
import { transformUser } from './helpers'
import { Entities } from '../constants'

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
  .subscribe((fields) => {
    FirebaseAuth
      .createUserWithEmailAndPassword(fields.email, fields.password)
      .then(user => {
        user.sendEmailVerification();
        return user;
      })
      .then(({uid, email}) => {
        FirebaseDb.ref('users/' + uid).set({
          email,
          emailPassword: true,
          pendingProfile: true,
        });
        return uid;
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
    const user = FirebaseAuth.currentUser;
    const userTypeSpecificTable =
      fields.profiletype === Entities.userTypes.VOLUNTEER
        ? 'volunteers'
        : fields.profiletype === Entities.userTypes.REFUGEE
          ? 'refugees'
          : fields.profiletype === Entities.userTypes.ASYLUM_SEEKER
            ? 'asylum_seekers'
            : null;

    FirebaseDb
      .ref('users/' + user.uid)
      .update({
        type:  fields.profiletype,
        camp_admin: false,
        pendingProfile: false,
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
      .then(() => Handlers.goToPath('/'));
  })

payloads$(Actions.SIGNUP_FACEBOOK_REQUESTED)
  .subscribe(() => {
    let fbProvider = new FirebaseAuth.FacebookAuthProvider();
    FirebaseAuth.signInWithPopup(fbProvider)
      .then(result => {
        let token = result.credential.accessToken;
        let user = result.user;
        console.log(token);
        console.log(user);
      })
      .catch(err => {
        console.log('panic!');
        console.log(err);
      })
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
    Handlers.goToPath('/login');
    const user = transformUser(FirebaseAuth.currentUser);
    FirebaseAuth
      .signOut()
      .then(() => Handlers.okUser('auth', 'Good bye', `${user.email}`))
      .catch(err => Handlers.errorUser('auth', 'Sign Out', err));
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

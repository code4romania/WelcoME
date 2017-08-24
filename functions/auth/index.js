'use strict';
const admin = require('firebase-admin');
const { withAuth, withoutAuth } = require('./helpers');

const updateProfile = require('./updateprofile');
const { sendResetEmail } = require('./sendemails');
const { verifyEmailCode, resetPasswordCode } = require('./verifycodes');

const sendReset = withoutAuth((req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.end();
  }
  admin.auth().getUserByEmail(email)
    .then(user => admin.database().ref(`users/${user.uid}`).once('value'))
    .then(snapshot => {
      const user = snapshot.val();
      return sendResetEmail({ uid: user.uid, email, lang: user.lang });
    })
    .then(() => res.end())
    .catch(() => res.end());
});

// not auth function for verifying email or resetting password
const tryCode = withoutAuth((req, res) => {
  const { email, code, mode, extra = {} } = req.body;
  if (!email || !code || !mode) {
    return res.status(400).send('Bad request!');
  }
  admin.database().ref(`codes/${email}/${mode}`).once('value', snapshot => {
    const val = snapshot.val();
    if (!val || !val.uid || (val.code !== code) || !val.email) {
      return res.status(400).send('Token expired!');
    }
    const scope = {};
    if (mode === 'verifyEmail') {
      verifyEmailCode({ uid: val.uid })
        .then(customToken => {
          scope.customToken = customToken;
          return admin.database().ref(`codes/${email}/${mode}`).remove();
        })
        .then(() => updateProfile({profile: {}, uid: val.uid}))
        .then(() => res.json({ uid: val.uid, customToken: scope.customToken, email: val.email }))
        .catch(() => res.status(400).send('Token expired!'));
    } else if (mode === 'resetPassword') {
      resetPasswordCode({ uid: val.uid, password: extra.password })
        .then(customToken => {
          scope.customToken = customToken;
          return admin.database().ref(`codes/${email}/${mode}`).remove();
        })
        .then(() => updateProfile({profile: {}, uid: val.uid}))
        .then(() => res.json({ uid: val.uid, customToken: scope.customToken }))
        .catch(() => res.status(400).send('Token expired!'));
    } else {
      res.status(400).send('Bad request!');
    }
  });
});

// change user profile and account
// authentication required
const changeProfile = withAuth((req, res) => {
  const profile = req.body;
  const uid = req.user && req.user.uid;
  if (!profile || !uid) {
    return res.status(400).send('Bad request!');
  }
  updateProfile({profile, uid})
    .then(() => res.end())
    .catch(err => res.status(400).send(err.message));
});

// when user is deleted clean up database
const accountDeleted = event => {
  const uid = event.data.uid;
  admin.database().ref(`/users/${uid}`).remove();
};

module.exports = {
  tryCode,
  sendReset,
  changeProfile,
  accountDeleted
};

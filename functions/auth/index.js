'use strict'
const admin = require('firebase-admin')
const { withAuth, withoutAuth } = require('./helpers')

const updateProfile = require('./updateprofile')
const { verifyEmailCode } = require('./verifycodes')

// not auth function for verifying email or resetting password
const tryCode = withoutAuth((req, res) => {
  const { email, code, mode, extra = {} } = req.body
  if (!email || !code || !mode) {
    return res.status(400).send('Bad request!')
  }
  admin.database().ref(`codes/${email}/${mode}`).once('value', snapshot => {
    const val = snapshot.val()
    if (!val || !val.uid || (val.code !== code) || !val.email) {
      return res.status(400).send('Token expired!')
    }
    const scope = {}
    if (mode === 'verifyEmail') {
      verifyEmailCode({ uid: val.uid })
        .then(customToken => {
          scope.customToken = customToken
          return admin.database().ref(`codes/${email}/${mode}`).remove()
        })
        .then(() => updateProfile({profile: {}, uid: val.uid}))
        .then(() => res.json({ uid: val.uid, customToken: scope.customToken, email: val.email }))
        .catch(() => res.status(400).send('Update error!'))
    } else if (mode === 'resetPassword') {
      const uid = '111'

      if (extra.password && (extra.password.length >= 6)) {
        admin.auth().updateUser(uid, {
          password: extra.password
        }).then(() => {
          res.send({
            email
          })
        }).catch(() => res.status(400).send('Update error!'))
      }
      return res.end()
    } else {
      res.status(400).send('Bad request!')
    }
  })
})

// change user profile and account
// authentication required
const changeProfile = withAuth((req, res) => {
  const profile = req.body
  const uid = req.user && req.user.uid
  if (!profile || !uid) {
    return res.status(400).send('Bad request!')
  }
  updateProfile({profile, uid})
  .then(() => res.end())
  .catch(err => res.status(400).send(err.message))
})

// when user is deleted clean up database
const accountDeleted = event => {
  const uid = event.data.uid
  admin.database().ref(`/users/${uid}`).remove()
}

exports = {
  tryCode,
  changeProfile,
  accountDeleted
}

'use strict'
const admin = require('firebase-admin')

module.exports.verifyEmailCode = ({ uid }) => new Promise((resolve, reject) => {
  admin.auth().updateUser(uid, {
    emailVerified: true
  })
  .then(() => admin.database().ref(`users/${uid}`).update({
    emailVerified: true
  }))
  .then(() => admin.auth().createCustomToken(uid))
  .then(resolve)
  .catch(reject)
})

'use strict'
const admin = require('firebase-admin')

module.exports = {

  resetPasswordCode: ({uid, password}) => new Promise((resolve, reject) => {
    if (password && (password.length >= 6)) {
      admin.auth().updateUser(uid, {
        password
      })
      .then(() => admin.auth().createCustomToken(uid))
      .then(resolve)
      .catch(reject)
    } else {
      reject(new Error('Bad Password!'))
    }
  }),

  verifyEmailCode: ({ uid }) => new Promise((resolve, reject) => {
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
}

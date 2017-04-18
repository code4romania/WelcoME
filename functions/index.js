'use strict'
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// when a user is created
exports.profileModified = functions.database.ref(`/usersWrites/{uid}`).onWrite(event => {
  const uid = event.params.uid
  const auth = admin.auth()
  const keys = event.data.val()
  const fields = keys && Object.keys(keys).reduce((acc, key) => typeof keys[key] === 'object' ? Object.assign(acc, keys[key]) : acc, {})
  const permitedKeys = ['firstName', 'lastName']
  Object.keys(fields).forEach(key => {
    if (!permitedKeys.includes(key)) {
      fields[key] = undefined
    }
  })
  auth.getUser(uid).then(user => {
    Object.assign(fields, {
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.metadata.createdAt,
      provider: user.providerData.providerId
    })
    console.log('Updated user:', user, fields)
    admin.database().ref(`/users/${uid}`).update(fields)
  }).catch(err => console.log(err))
})

// when a user is created
exports.accountCreated = functions.auth.user().onCreate(event => {
  const uid = event.data.uid
  admin.database().ref(`/usersWrites/${uid}`).push(uid)
})

// when a user is deleted
exports.accountDeleted = functions.auth.user().onDelete(event => {
  const uid = event.data.uid
  admin.database().ref(`/users/${uid}`).remove()
  admin.database().ref(`/usersWrites/${uid}`).remove()
})


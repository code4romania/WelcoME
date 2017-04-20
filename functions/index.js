'use strict'
const functions = require('firebase-functions')
const admin = require('firebase-admin')
var serviceAccount = require('./cert.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://welcome-1f483.firebaseio.com'
})

const {
  tryCode,
  changeProfile,
  accountDeleted
} = require('./auth')

// when an account is modified
// without authentication
exports.tryCode = functions.https.onRequest(tryCode)

// when a profile is modified
// authenticated
exports.changeProfile = functions.https.onRequest(changeProfile)

// when a user is deleted
exports.accountDeleted = functions.auth.user().onDelete(accountDeleted)

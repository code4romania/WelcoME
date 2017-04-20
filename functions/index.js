'use strict'
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const {
  tryCode,
  changeProfile,
  accountCreated,
  accountDeleted
} = require('./auth').default

// when an account is modified
// without authentication
exports.tryCode = functions.https.onRequest(tryCode)

// when a profile is modified
// authenticated
exports.changeProfile = functions.https.onRequest(changeProfile)

// when a user is created
exports.accountCreated = functions.auth.user().onCreate(accountCreated)

// when a user is deleted
exports.accountDeleted = functions.auth.user().onDelete(accountDeleted)


'use strict'
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const Auth = require('./auth').default

// when an account is modified
exports.tryCode = functions.https.onRequest(Auth.tryCode)

// when a profile is modified
exports.profileModified = functions.database.ref(`/usersWrites/{uid}`).onWrite(Auth.profileModified)

// when a user is created
exports.accountCreated = functions.auth.user().onCreate(Auth.accountCreated)

// when a user is deleted
exports.accountDeleted = functions.auth.user().onDelete(Auth.accountDeleted)


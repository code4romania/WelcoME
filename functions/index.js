'use strict'
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const Auth = require('./auth').default

// when an account is modified
exports.accountModified = functions.database.ref(`/usersWrites/{uid}/account`).onWrite(Auth.accountModified)

// when a profile is modified
exports.profileModified = functions.database.ref(`/usersWrites/{uid}`).onWrite(Auth.profileModified)

// when a user is created
exports.accountCreated = functions.auth.user().onCreate(Auth.accountCreated)

// when a user is deleted
exports.accountDeleted = functions.auth.user().onDelete(Auth.accountDeleted)


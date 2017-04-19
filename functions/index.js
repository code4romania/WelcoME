'use strict'
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')
admin.initializeApp(functions.config().firebase)

const Auth = require('./auth').default

// when an account is modified
exports.tryCode = functions.https.onRequest((req, res) => cors()(req, res, () => Auth.tryCode(req, res)))

// when a profile is modified
exports.changeProfile = functions.https.onRequest((req, res) => cors()(req, res, () => Auth.changeProfile(req, res)))

// when a user is created
exports.accountCreated = functions.auth.user().onCreate(Auth.accountCreated)

// when a user is deleted
exports.accountDeleted = functions.auth.user().onDelete(Auth.accountDeleted)


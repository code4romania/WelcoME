'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
var serviceAccount = require('./cert.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://welcome-1f483.firebaseio.com'
});

const {
  tryCode,
  changeProfile,
  sendReset,
  accountDeleted
} = require('./auth');

module.exports = {
  tryCode: functions.https.onRequest(tryCode),
  sendReset: functions.https.onRequest(sendReset),
  changeProfile: functions.https.onRequest(changeProfile),
  accountDeleted: functions.auth.user().onDelete(accountDeleted)
};

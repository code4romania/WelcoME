'use strict'
const admin = require('firebase-admin')
const cors = require('cors')({
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200
})

module.exports = {
  withoutAuth: func => (req, res) => cors(req, res, () => func(req, res)),

  withAuth: func => (req, res) => cors(req, res, () => new Promise((resolve, reject) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      resolve(res.status(403).send('Unauthorized'))
      return
    }
    const idToken = req.headers.authorization.split('Bearer ')[1]
    admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
      req.user = decodedIdToken
      resolve(func(req, res))
    }).catch(error => {
      console.error('Error while verifying Firebase ID token:', error)
      resolve(res.status(403).send('Unauthorized'))
    })
  }))}

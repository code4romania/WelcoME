const admin = require('firebase-admin')
const cors = require('cors')({origin: true})

// add cors and auth for https functions
exports.withoutAuth = func => (req, res) => cors(req, res, () => func(req, res))

exports.withAuth = func => (req, res) => cors(req, res, () => new Promise((resolve, reject) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return resolve(res.status(403).send('Unauthorized'))
  }
  const idToken = req.headers.authorization.split('Bearer ')[1]
  admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
    console.log('ID Token correctly decoded', decodedIdToken)
    req.user = decodedIdToken
    resolve(func(req, res))
  }).catch(error => {
    console.error('Error while verifying Firebase ID token:', error)
    resolve(res.status(403).send('Unauthorized'))
  })
}))

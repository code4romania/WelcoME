const admin = require('firebase-admin')
const cors = require('cors')({origin: true})
exports.no = func => (req, res) => cors(req, res, () => func(req, res))
exports.yes = func => (req, res) => cors(req, res, () => new Promise((resolve, reject) => {
  console.log('Check if request is authorized with Firebase ID token')

  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>')
    resolve(res.status(403).send('Unauthorized'))
    return
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

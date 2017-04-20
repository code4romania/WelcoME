'use strict'
const admin = require('firebase-admin')

const { sendVerificationEmail } = require('./sendemails.js')

exports = ({ profile, uid }) => new Promise((resolve, reject) => {
  const auth = admin.auth()
  const permitedKeys = ['firstName', 'lastName', 'facebookCredential', 'googleCredential', 'lang']
  const scope = {}
  const newProfile = Object.assign({}, profile)

  auth.getUser(uid).then(user => {
    const providers = user.providerData || []
    const password = providers.find(prov => prov.providerId === 'password')
    const facebook = providers.find(prov => prov.providerId === 'facebook.com')
    const google = providers.find(prov => prov.providerId === 'google.com')

    let emailVerified = user.emailVerified
    if (!emailVerified && facebook) {
      emailVerified = true
      scope.updateUser = true
    }
    scope.sendVerificationEmail = !emailVerified && profile.sendVerificationEmail ? user.email : null

    Object.keys(profile).forEach(key => {
      if (!permitedKeys.includes(key)) {
        delete newProfile[key]
      }
    })

    Object.assign(newProfile, {
      uid,
      email: user.email,
      emailVerified,
      password: !!password,
      google: !!google,
      facebook: !!facebook
    })
  })
  .then(() => scope.updateUser && auth.updateUser(uid, { emailVerified: true }))
  .then(() => scope.sendVerificationEmail && sendVerificationEmail({
    uid,
    email: scope.sendVerificationEmail,
    lang: profile.lang
  }))
  // write all modifs in the users uid key
  .then(() => admin.database().ref(`/users/${uid}`).update(newProfile))
  .then(resolve)
  .catch(reject)
})

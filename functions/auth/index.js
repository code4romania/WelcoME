'use strict'
const admin = require('firebase-admin')
const sendVerificationEmail = require('./sendemails').sendVerificationEmail
// when account changes update users key
const tryCode = (req, res) => {
  const { email, code, mode } = req.body

  // when key is cancelled or empty do nothing
  if (!email || !code || !mode) {
    return res.status(400).send('Bad request!')
  }

  return res.end()
  /*
  const { verifyEmail } = val
  if (verifyEmail) {
  admin.database().ref(`/codes/${email}/verifyEmail`).once(snapshot => {
    const code = snapshot.val()
    if (code === verifyEmail) {

    } else {

    }
  })
  }
  admin.database().ref(`/users/${uid}`).update(account) */
}

const changeProfile = (req, res) => {
  const auth = admin.auth()
  const { uid, profile } = req.body

  // when key is cancelled or empty do nothing
  if (!profile || !uid) {
    return res.status(400).send('Bad request!')
  }

  // find updated user
  auth.getUser(uid).then(user => {
    const providers = user.providerData || []
    const password = providers.find(prov => prov.providerId === 'password')
    const facebook = providers.find(prov => prov.providerId === 'facebook.com')
    const google = providers.find(prov => prov.providerId === 'google.com')
    let emailVerified = user.emailVerified
    let updateUserFlag = false
    if (!emailVerified && facebook) {
      // if is facebook provider, update emailVerified to true, manually
      emailVerified = true
      updateUserFlag = true
    }
    let sendVerificationToEmail = !emailVerified && profile.sendVerificationEmail ? user.email : null

    // accept only some keys in users profile
    const permitedKeys = ['firstName', 'lastName', 'facebookCredential', 'googleCredential', 'lang']
    Object.keys(profile).forEach(key => {
      if (!permitedKeys.includes(key)) {
        delete profile[key]
      }
    })

    // integrate last account values from auth
    Object.assign(profile, {
      email: user.email,
      emailVerified,
      password: !!password,
      google: !!google,
      facebook: !!facebook
    })

    console.log('Update uid:', user, profile)
    return {
      sendVerificationToEmail,
      updateUserFlag
    }
    // update users key
  })
  .then(resp => resp.updateUserFlag
     ? auth.updateUser(uid, { emailVerified: true }).then(() => resp.sendVerificationToEmail)
     : resp.sendVerificationToEmail)
  .then(email => email ? sendVerificationEmail({ email, lang: profile.lang }) : admin.database().ref(`/users/${uid}`).update(profile))
  .then(() => res.end())
  .catch(err => res.status(400).send(err.message))
}

// when user is created update users key
const accountCreated = event => {
  const auth = admin.auth()
  const user = event.data
  const uid = user.uid
  auth.getUser(uid).then(account => {
    const providers = account.providerData || []
    const password = providers.find(prov => prov.providerId === 'password')
    const facebook = providers.find(prov => prov.providerId === 'facebook.com')
    const google = providers.find(prov => prov.providerId === 'google.com')
    admin.database().ref(`/users/${uid}`).set({
      email: user.email,
      emailVerified: !password,
      createdAt: user.metadata.createdAt,
      password: !!password,
      google: !!google,
      facebook: !!facebook
    })
  })
}

// when user is deleted clean up database
const accountDeleted = event => {
  const uid = event.data.uid
  admin.database().ref(`/users/${uid}`).remove()
}

exports.default = {
  tryCode,
  changeProfile,
  accountCreated,
  accountDeleted
}

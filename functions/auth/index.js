'use strict'
const admin = require('firebase-admin')
const { withAuth, withoutAuth } = require('./helpers').default

const sendVerificationEmail = require('./sendemails').sendVerificationEmail

// not auth function for verifying email or resetting password
const tryCode = withoutAuth((req, res) => {
  const { email, code, mode, extra = {} } = req.body
  // some validations
  if (!email || !code || !mode) {
    return res.status(400).send('Bad request!')
  }
  console.log('Try code arrived', email, code, mode)
  // grab the key
  admin.database().ref(`codes/${email}/${mode}`).once('value', snapshot => {
    const val = snapshot.val()
    // verify key
    if (!val || !val.uid || (val.code !== code) || !val.email) {
      return res.status(400).send('Token expired!')
    }

    if (mode === 'verifyEmail') {
      // verify email code arrived
      // update account
      admin.auth().updateUser(val.uid, {
        emailVerified: true
      })
      // update users uid key
      .then(() => admin.database().ref(`users/${val.uid}`).update({
        emailVerified: true
      }))
      // remove key
      .then(() => admin.database().ref(`codes/${email}/${mode}`).remove())
      .then(() => admin.auth().createCustomToken(val.uid))
      .then(customToken => {
        console.log('Email verified!', email)
        res.json({ uid: val.uid, customToken, email: val.email })
      }).catch(err => {
        console.error(err)
        res.status(400).send('Update error!')
      }
      )
    } else if (mode === 'resetPassword') {
      // reset password code arrived
      const uid = '111'

      if (extra.password && (extra.password.length >= 6)) {
        admin.auth().updateUser(uid, {
          password: extra.password
        }).then(() => {
          res.send({
            email
          })
        }).catch(() => res.status(400).send('Update error!'))
      }
      return res.end()
    } else {
      res.status(400).send('Bad request!')
    }
  })
})

// change user profile and account
// authentication required
const changeProfile = withAuth((req, res) => {
  const permitedKeys = ['firstName', 'lastName', 'facebookCredential', 'googleCredential', 'lang']

  const auth = admin.auth()
  const profile = req.body
  // get uid from authorization token
  const uid = req.user && req.user.uid

  // some validations
  if (!profile || !uid || !Object.keys(profile).length) {
    return res.status(400).send('Bad request!')
  }

  // object for doing some async work
  const obj = {
    flags: {
      updateUser: false
    },
    profile: Object.assign({}, profile)
  }

  // find the updated user account
  auth.getUser(uid).then(user => {
    const providers = user.providerData || []
    const password = providers.find(prov => prov.providerId === 'password')
    const facebook = providers.find(prov => prov.providerId === 'facebook.com')
    const google = providers.find(prov => prov.providerId === 'google.com')

    // if is facebook provider, update emailVerified to true, manually, and dont send email for verification
    let emailVerified = user.emailVerified
    if (!emailVerified && facebook) {
      emailVerified = true
      obj.flags.updateUser = true
    }

    // if email verification needed
    obj.flags.sendVerificationEmail = !emailVerified && profile.sendVerificationEmail ? user.email : null

    // truncate non permitted user keys in profile
    Object.keys(profile).forEach(key => {
      if (!permitedKeys.includes(key)) {
        delete obj.profile[key]
      }
    })

    // integrate profile with last account values from firebase
    Object.assign(obj.profile, {
      uid,
      email: user.email,
      emailVerified,
      password: !!password,
      google: !!google,
      facebook: !!facebook
    })
  })
  // update some things in the user account if needed
  .then(() => obj.flags.updateUser && auth.updateUser(uid, { emailVerified: true }))
  // send verification email if needed
  .then(() => obj.flags.sendVerificationEmail && sendVerificationEmail({
    uid,
    email: obj.flags.sendVerificationEmail,
    lang: profile.lang
  }))
  // write all modifs in the users uid key
  .then(() => admin.database().ref(`/users/${uid}`).update(obj.profile))
  .then(() => res.end())
  .catch(err => res.status(400).send(err.message))
})

// when user is deleted clean up database
const accountDeleted = event => {
  const uid = event.data.uid
  // remove users uid key
  admin.database().ref(`/users/${uid}`).remove()
}

// when user is created create users key for the first time
const accountCreated = event => {

}

exports.default = {
  tryCode,
  changeProfile,
  accountCreated,
  accountDeleted
}

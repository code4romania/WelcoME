'use strict'
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
const rs = require('randomstring')
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: gmailEmail,
    clientId: '578400874611-h8lfd7t3g8prfjrvba36m5srabcjqffi.apps.googleusercontent.com',
    clientSecret: gmailPassword,
    refreshToken: '1/U3veQsdoGsq0-1YTAij6eEhCG2PQwlrLObYGAna3nDg'
  }
}, {
  from: gmailEmail
})

const sendVerificationEmail = ({email, lang}) => {
  console.log('Send2 verification email', mailTransport, email, lang)
  const mailOptions = {
    to: email
  }
  const code = rs.generate(20)
  mailOptions.subject = 'Verify email for WelcoME!'
  mailOptions.text = `   Hello ${email},
        Follow this link to verify your email address.
        http://localhost:3000/actions?mode=verifyEmail&oobCode=${code}&email=${email}
        If you didn’t ask to verify this address, you can ignore this email.
        Thanks,
        Your Welcome team
  `
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New subscription confirmation email sent to:', email)
    mailTransport.close()
  }).catch(err => console.warn('Error sending mail', err))
}

// when account changes update users key
const accountModified = event => {
  const uid = event.params.uid
  const account = event.data.val()
  admin.database().ref(`/users/${uid}`).update(account)
}

const profileModified = event => {
  const auth = admin.auth()
  const uid = event.params.uid
  const val = event.data.val()

  // when key is cancelled or empty do nothing
  if (!val || !Object.keys(val).length) {
    return
  }

  // find updated user
  auth.getUser(uid).then(user => {
    const providers = user.providerData || []
    const password = providers.find(prov => prov.providerId === 'password')
    const facebook = providers.find(prov => prov.providerId === 'facebook.com')
    const google = providers.find(prov => prov.providerId === 'google.com')
    let emailVerified = user.emailVerified
    if (!emailVerified && facebook) {
      // if is facebook provider, update emailVerified to true, manually
      emailVerified = true
      auth.updateUser(uid, {
        emailVerified: true
      })
    }

    // if send verification email
    if (!emailVerified && val.sendVerificationEmail) {
      sendVerificationEmail({ email: user.email, lang: val.lang })
      return admin.database().ref(`/usersWrites/${uid}`).remove()
    }

    // accept only some keys in users profile
    const permitedKeys = ['firstName', 'lastName', 'facebookCredential', 'googleCredential', 'lang']
    Object.keys(val).forEach(key => {
      if (!permitedKeys.includes(key)) {
        delete val[key]
      }
    })

    // integrate last account values from auth
    Object.assign(val, {
      email: user.email,
      emailVerified,
      password: !!password,
      google: !!google,
      facebook: !!facebook
    })

    console.log('Update uid:', user, val)
    // update users key
    const upd = {}
    upd[`/users/${uid}`] = val
    upd[`/usersWrites/${uid}`] = null
    admin.database().ref().update(upd)
  }).catch(err => console.warn('User not found', err))
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
  const del = {}
  del[`/users/${uid}`] = null
  del[`/usersWrites/${uid}`] = null
  admin.database().ref().update(del)
}

exports.default = {
  accountModified,
  profileModified,
  accountCreated,
  accountDeleted
}

const admin = require('firebase-admin')

const sendVerificationEmail = ({email, lang}) => {
  console.log('Send verification email', email, lang)
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

  // when key is cancelled do nothing
  if (!val) {
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
      return sendVerificationEmail({ email: user.email, lang: val.lang })
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
  })
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

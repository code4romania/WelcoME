const admin = require('firebase-admin')

// when account changes update users key
const accountModified = event => {
  const uid = event.params.uid
  const account = event.data.val()
  admin.database().ref(`/users/${uid}`).update(account)
}

const profileModified = event => {
  const auth = admin.auth()
  const uid = event.params.uid
  const keys = event.data.val()
  if (!keys) {
    return
  }

  const fields = keys && Object.keys(keys).reduce((acc, key) => typeof keys[key] === 'object' ? Object.assign(acc, keys[key]) : acc, {}) || {}
  const permitedKeys = ['firstName', 'lastName']
  Object.keys(fields).forEach(key => {
    if (!permitedKeys.includes(key)) {
      fields[key] = undefined
    }
  })

  auth.getUser(uid).then(user => {
    const providers = user.providerData || []
    const password = providers.find(prov => prov.providerId === 'password')
    const facebook = providers.find(prov => prov.providerId === 'facebook.com')
    const google = providers.find(prov => prov.providerId === 'google.com')
    let emailVerified = user.emailVerified

    let updateUser = false
    if (!emailVerified && facebook) {
      // if is facebook provider, I will update emailVerified to true, manually
      emailVerified = true
      updateUser = true
    }

    Object.assign(fields, {
      email: user.email,
      emailVerified,
      createdAt: user.metadata.createdAt,
      password: !!password,
      google: !!google,
      facebook: !!facebook
    })
    console.log('Update uid:', user, fields)
    admin.database().ref(`/users/${uid}`).update(fields)
    return updateUser
  }).then(updateUser => {
    if (updateUser) {
      console.log('Update facebook verified flag')
      auth.updateUser(uid, {
        emailVerified: true
      })
    }
  })
  .catch(err => console.log(err))
}

// when user is created update account key for modifying account
const accountCreated = event => {
  const user = event.data
  const uid = user.uid
  const providers = user.providerData || []
  const password = providers.find(prov => prov.providerId === 'password')
  const facebook = providers.find(prov => prov.providerId === 'facebook.com')
  const google = providers.find(prov => prov.providerId === 'google.com')
  admin.database().ref(`/usersWrites/${uid}/account`).set({
    email: user.email,
    emailVerified: !password,
    createdAt: user.metadata.createdAt,
    password: !!password,
    google: !!google,
    facebook: !!facebook
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

exports.Auth = {
  accountModified,
  profileModified,
  accountCreated,
  accountDeleted
}

'use strict'
const admin = require('firebase-admin')

const { sendVerificationEmail } = require('./sendemails.js')

module.exports = ({ profile, uid }) => new Promise((resolve, reject) => {
  const auth = admin.auth();
  const profileKeys = [
    'firstName',
    'lastName',
    'type',
    'locale',
    'sendVerificationEmail',
    'facebookCredential',
    'googleCredential',
  ];
  const scope = {};
  const newProfile = Object.assign({}, profile);

  admin.database().ref(`/users/${uid}`).once('value')
    .then(snapshot => {
      scope.account = snapshot.val() || {}
    })
    .then(() => auth.getUser(uid))
    .then(user => {
      const providers = user.providerData || [];
      const password = providers.find(prov => prov.providerId === 'password');
      const facebook = providers.find(prov => prov.providerId === 'facebook.com');
      const google = providers.find(prov => prov.providerId === 'google.com');

      let emailVerified = user.emailVerified;
      if (!emailVerified && facebook) {
        emailVerified = true;
        scope.updateUser = true;
      }
      scope.sendVerificationEmail =
        !emailVerified && profile.sendVerificationEmail
          ? user.email
          : null;

      Object.keys(profile).forEach(key => {
        if (!profileKeys.includes(key)) {
          delete newProfile[key];
        }
      })
      Object.keys(newProfile).forEach(key => {
        if (profileKeys.includes(key) && !newProfile[key]) {
          delete newProfile[key];
        }
      })

      if (!facebook) newProfile.facebookCredential = null
      if (!google) newProfile.googleCredential = null
      let displayName = user.displayName
      if (!displayName && facebook) displayName = facebook.displayName
      if (!displayName && google) displayName = google.displayName
      if (displayName && !scope.account.firstName && !scope.account.lastName) {
        const names = displayName.split(' ')
        const lastName = names.pop()
        const firstName = names.join(' ')
        newProfile.lastName = lastName
        newProfile.firstName = firstName
      }

      // ------------
      // TODO don't change user type after some condition ex. have posts
      // if (!scope.account.type && profile.type) newProfile.type = profile.type
      // ----------------
      Object.assign(newProfile, {
        uid,
        email: user.email,
        emailVerified,
        password: !!password,
        type: profile.type,
        google: !!google,
        facebook: !!facebook,
      })
    })
    .then(() => scope.updateUser && auth.updateUser(uid, { emailVerified: true }))
    .then(() => scope.sendVerificationEmail && sendVerificationEmail({
      uid,
      email: scope.sendVerificationEmail,
      lang: profile.locale
    }))
    // write all modifs in the users uid key
    .then(() => admin.database().ref(`/users/${uid}`).update(newProfile))
    .then(resolve)
    .catch(reject);
})


export const getCredentialKey = credential => {
  if (credential.providerId === 'facebook.com') {
    return 'facebook'
  } else if (credential.providerId === 'google.com') {
    return 'google'
  } else {
    return 'other'
  }
}

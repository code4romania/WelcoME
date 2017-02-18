
export const transformUser = (user) => (user ? {
  uid: user.uid,
  email: user.email,
  verified: user.emailVerified,
} : null)

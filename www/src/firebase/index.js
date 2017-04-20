import Firebase from 'firebase'

import getFetchFunc from './fetch'

// Set up Firebase
var config = {
  apiKey: 'AIzaSyDLt7lrJEkHhmEb-cy0yonb7jJDfAlr1WE',
  authDomain: 'welcome-1f483.firebaseapp.com',
  databaseURL: 'https://welcome-1f483.firebaseio.com',
  storageBucket: 'welcome-1f483.appspot.com',
  messagingSenderId: '17885379271',
  functionsURL: 'https://us-central1-welcome-1f483.cloudfunctions.net/'
}

Firebase.initializeApp(config)

export const FirebaseAuth = Firebase.auth()
export const FirebaseDb = Firebase.database()
export const FirebaseFetch = getFetchFunc(config)

export const FacebookProvider = new Firebase.auth.FacebookAuthProvider()
// FacebookProvider.addScope('email')
// FacebookProvider.addScope('profile')
export const GoogleProvider = new Firebase.auth.GoogleAuthProvider()
GoogleProvider.addScope('email')
GoogleProvider.addScope('profile')

export default Firebase

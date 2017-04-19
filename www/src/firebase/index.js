import Firebase from 'firebase'
import fetch from 'node-fetch'
// Set up Firebase
var config = {
  apiKey: 'AIzaSyDLt7lrJEkHhmEb-cy0yonb7jJDfAlr1WE',
  authDomain: 'welcome-1f483.firebaseapp.com',
  databaseURL: 'https://welcome-1f483.firebaseio.com',
  storageBucket: 'welcome-1f483.appspot.com',
  messagingSenderId: '17885379271'
}

Firebase.initializeApp(config)

export const FirebaseAuth = Firebase.auth()
export const FirebaseDb = Firebase.database()
export const FacebookProvider = new Firebase.auth.FacebookAuthProvider()
// FacebookProvider.addScope('email')
// FacebookProvider.addScope('profile')
export const GoogleProvider = new Firebase.auth.GoogleAuthProvider()
GoogleProvider.addScope('email')
GoogleProvider.addScope('profile')
export default Firebase

Firebase.fetch = (func, body) => fetch('https://us-central1-welcome-1f483.cloudfunctions.net/' + func, {body}).then(res => {
  if (res.status !== 200) {
    throw new Error(res.text())
  } else {
    return res.json()
  }
})

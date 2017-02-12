import Firebase from 'firebase'

// Set up Firebase
/* var config = {
  apiKey: 'AIzaSyDLt7lrJEkHhmEb-cy0yonb7jJDfAlr1WE',
  authDomain: 'welcome-1f483.firebaseapp.com',
  databaseURL: 'https://welcome-1f483.firebaseio.com',
  storageBucket: 'welcome-1f483.appspot.com',
  messagingSenderId: '17885379271'
} */
var configRazvan = {
  apiKey: 'AIzaSyB9NWTMwKnGvvWWm55UcXuwXL_Ttndjafc',
  authDomain: 'avangear-34841.firebaseapp.com',
  databaseURL: 'https://avangear-34841.firebaseio.com',
  storageBucket: 'avangear-34841.appspot.com',
  messagingSenderId: '808871774750'
}
Firebase.initializeApp(configRazvan)
global.Firebase = Firebase
export default Firebase

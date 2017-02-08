import Firebase from '../store/firebase';
import store from '../store';
import {push} from 'react-router-redux';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const RECEIVED_PROFILE = 'RECEIVED_PROFILE';

// Auth observer will dispatch auth actions
Firebase
  .auth()
  .onAuthStateChanged(user => {
    

    // Remove old profile from store
    store.dispatch({type: RECEIVED_PROFILE});

    // Watch new profile for signed-in user
    if (user) 
      Firebase.database().ref('users/' + user.uid).on('value', profileData => {
        store.dispatch({
          type: RECEIVED_PROFILE,
          payload: profileData.val()
        });
      });
    
    // Update store
    store.dispatch({type: AUTH_USER, payload: user});
    }
  , error => store.dispatch({type: AUTH_ERROR, payload: error}));

// Sign out
export const signOutUser = () => {
  store.dispatch({type: AUTH_REQUEST});
  Firebase
    .auth()
    .signOut();
  store.dispatch(push('/'));
};

// Creates a user with email
export const signUpUser = credentials => dispatch => {
  dispatch({type: AUTH_REQUEST});
  Firebase
    .auth()
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then(user => {
      dispatch({type: AUTH_USER, payload: user});
      dispatch(push('/favorites'));
    })
    .catch(error => dispatch({type: AUTH_ERROR, payload: error}));
};

// Sign in with email
export const signInUser = credentials => dispatch => {
  dispatch({type: AUTH_REQUEST});
  Firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(user => {
      dispatch({type: AUTH_USER, payload: user});
      dispatch(push('/favorites'));
    })
    .catch(error => dispatch({type: AUTH_ERROR, payload: error}));
};

// Sign in with email
export const forgotUser = credentials => dispatch => {  
  Firebase
    .auth()
    .sendPasswordResetEmail(credentials.email)
    .then(user => {
      //TO DO: change this to some toast or something!!!
      alert('Email sent');
    })
    .catch(error => dispatch({type: AUTH_ERROR, payload: error}));
};

//Update profile
export const updateProfile = profileData => dispatch => {
  const user = Firebase
    .auth()
    .currentUser;
  if (user != null) {
    Firebase
      .database()
      .ref('users/' + user.uid)
      .set({name: profileData.name, surname: profileData.surname})
      .then(response => {
        dispatch(push('/favorites'));
      });
  }
};
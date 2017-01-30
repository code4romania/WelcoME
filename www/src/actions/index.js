import request from 'superagent';
import { compactActions } from 'redux';
import { browserHistory } from 'react-router';
import Firebase from 'firebase';

// Profile action types
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const GET_PROFILE = 'GET_PROFILE';

// Set up Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDLt7lrJEkHhmEb-cy0yonb7jJDfAlr1WE",
  authDomain: "welcome-1f483.firebaseapp.com",
  databaseURL: "https://welcome-1f483.firebaseio.com",
  storageBucket: "welcome-1f483.appspot.com",
  messagingSenderId: "17885379271",
};

Firebase.initializeApp(firebaseConfig);

// Profile actions

/**
 * Creates a user with email
 */
export function signUpUser(credentials) {
  return function(dispatch) {
    Firebase.auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/');
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });
  }
}

/**
 * Sign in with email
 */
export function signInUser(credentials) {
  return function(dispatch) {
    Firebase.auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/');
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}

/**
 * TODO: next up
 */
export function signInUserWithFacebook() {
  return function(dispatch) {
    var provider = new Firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      'display': 'popup'
    });

    Firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        // ...
        console.log(user);
        dispatch(authUser());
        browserHistory.push('/');
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...

        console.log(errorMessage);
      });
  };
}

/**
 * Sign out and redirect to main page
 */
export function signOutUser() {
  Firebase.auth().signOut();
  browserHistory.push('/');

  return {
    type: SIGN_OUT_USER,
  }
}

/**
 * Check if the state has an authenticated user
 */
export function verifyAuth() {
  return function (dispatch) {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  }
}

/**
 * Base action for a user that has been authenticated
 */
export function authUser() {
  return {
    type: AUTH_USER,
  }
}

/**
 * Log whatever auth error we get
 */
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  }
}

/**
 * Update user profile data in db
 */
export function updateProfile(profileData) {
  return function(dispatch) {
    let user = Firebase.auth().currentUser;
    if (user != null) {
      Firebase.database().ref('users/' + user.uid).set({
        name: profileData.name,
        surname: profileData.surname,
      })
      .then(response => {
        dispatch(editProfile());
      })
    }
  }
}

/**
 * Redirect to user home page after profile editing
 */
export function editProfile() {
  browserHistory.push('/');

  return {
    type: EDIT_PROFILE,
  }
}

/**
 * Fetch the user profile data from db
 */
export function fetchProfile() {
  return dispatch => {
    let user = Firebase.auth().currentUser;
    if (user != null) {
      Firebase.database().ref('users/' + user.uid).on('value', profileData => {
        dispatch({
          type: GET_PROFILE,
          payload: profileData.val(),
        })
      });
    }
  }
}

import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase';
import firebase from 'firebase';
import devToolsEnhancer from 'remote-redux-devtools';

// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
});

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyDLt7lrJEkHhmEb-cy0yonb7jJDfAlr1WE',
  authDomain: 'welcome-1f483.firebaseapp.com',
  databaseURL: 'https://welcome-1f483.firebaseio.com/',
};
const reactFirebaseConfig = { userProfile: 'users' }; // react-redux-firebase config

// initialize firebase instance
const firebaseApp = firebase.initializeApp(firebaseConfig); // <- new to v2.*.*

// Add reduxReduxFirebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseApp, reactFirebaseConfig), // firebase instance as first argument
)(createStore);

// Create store with reducers and initial state
export const store = createStoreWithFirebase(
  rootReducer,
  devToolsEnhancer({ realtime: true }),
);

import { Google, Facebook } from 'expo';
import { getFirebase } from 'react-redux-firebase';
import { ANDROID_CLIENT_ID, FACEBOOK_APP_ID } from '../../env';

export const loginWithGoogle = async () => {
  const firebase = getFirebase();

  const { type, idToken } = await Google.logInAsync({
    androidClientId: ANDROID_CLIENT_ID,
  });
  if (type === 'cancel') {
    throw new Error('User canceled');
  }
  const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
  await firebase.auth().signInWithCredential(credential);
  return true;
};

export const loginWithFacebook = async () => {
  const firebase = getFirebase();

  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    FACEBOOK_APP_ID,
  );
  if (type === 'cancel') {
    throw new Error('User canceled');
  }
  const credential = firebase.auth.FacebookAuthProvider.credential(token);
  await firebase.auth().signInWithCredential(credential);
  return true;
};

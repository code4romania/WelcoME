import request from 'superagent';

import Firebase from 'firebase';


// TODO: remove GIF action types
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_GIFS = 'REQUEST_GIFS';
export const FETCH_FAVORITED_GIFS = 'FETCH_FAVORITED_GIFS';
const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';


// TODO: remove Gifs actions

export function requestGifs(term = null) {
  return function (dispatch) {
    request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
      dispatch({type: REQUEST_GIFS, payload: response});
    });
  };
}

export function favoriteGif({selectedGif}) {
  const userUid = Firebase
    .auth()
    .currentUser
    .uid;
  const gifId = selectedGif.id;

  return dispatch => Firebase
    .database()
    .ref(userUid)
    .update({[gifId]: selectedGif});
}

export function unfavoriteGif({selectedGif}) {
  const userUid = Firebase
    .auth()
    .currentUser
    .uid;
  const gifId = selectedGif.id;

  return dispatch => Firebase
    .database()
    .ref(userUid)
    .child(gifId)
    .remove();
}

export function fetchFavoritedGifs() {
  return dispatch => {
    var user = Firebase
      .auth()
      .currentUser;
    if (user != null) {
      Firebase
        .database()
        .ref(user.uid)
        .on('value', snapshot => {
          dispatch({
            type: FETCH_FAVORITED_GIFS,
            payload: snapshot.val()
          });
        });
    }
  };
}

export function openModal(gif) {
  return {type: OPEN_MODAL, gif};
}

export function closeModal() {
  return {type: CLOSE_MODAL};
}

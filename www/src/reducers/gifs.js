import { REQUEST_GIFS, FETCH_FAVORITED_GIFS } from '../actions';

const initialState =  {
  data: [],
  favorites: [],
};

// TODO: remove this
export default function gifs(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GIFS:
      return {
        ...state, data: action.payload.body.data
      };
    case FETCH_FAVORITED_GIFS:
      let arr = [];

      for (let i in action.payload ) {
        if (action.payload.hasOwnProperty(i)){
          arr.push(action.payload[i]);
        }
      }
      return {
        ...state, favorites: arr,
      };
    default:
      return state;
  }
}

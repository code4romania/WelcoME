import { EDIT_PROFILE, GET_PROFILE } from '../actions';

const initialState =  {
  profileData: {
    name: '',
    surname: '',
  }
};

export default function editprofile(state = initialState, action) {
  switch (action.type) {
    case EDIT_PROFILE:
      return {
        ...state,
      };
    case GET_PROFILE:
      return {
        ...state,
        profileData: {
          name: action.payload != null ? action.payload.name : '',
          surname: action.payload != null ? action.payload.surname : '',
        },
      };
    default:
      return state;
  }
}

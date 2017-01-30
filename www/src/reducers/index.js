import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import AuthReducer from './auth';
import EditProfileReducer from './editprofile';

// TODO: remove gifs and modal from here
const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  editprofile: EditProfileReducer,
});

export default rootReducer;

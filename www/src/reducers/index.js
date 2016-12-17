import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import AuthReducer from './auth';
import EditProfileReducer from './editprofile';
import GifsReducer from './gifs';
import ModalReducer from './modal';

// TODO: remove gifs and modal from here
const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  editprofile: EditProfileReducer,
  gifs: GifsReducer,
  modal: ModalReducer,
});

export default rootReducer;

import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import AuthReducer from './auth';
import GifsReducer from './gifs';
import ModalReducer from './modal';
import {routerReducer as RouterReducer} from 'react-router-redux';

// TODO: remove gifs and modal from here
const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,  
  gifs: GifsReducer,
  modal: ModalReducer,
  routing: RouterReducer
});

export default rootReducer;

import {createStore, compose, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import { browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};

const store = createStore(rootReducer, initialState, compose(applyMiddleware(reduxThunk, 
routerMiddleware(browserHistory)), window.devToolsExtension
  ? window.devToolsExtension()
  : f => f));

// Enable Webpack hot module replacement for reducers
if (module.hot) {
  module
    .hot
    .accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
}

export default store;
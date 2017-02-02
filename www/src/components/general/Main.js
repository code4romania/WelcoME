import React from 'react';
import {Provider} from 'react-redux';
import store from '../../store';
import router from '../../router';
import './Main.css';

const Main = () => (
  <Provider store={store}>
    {router}
  </Provider>
);

export default Main;
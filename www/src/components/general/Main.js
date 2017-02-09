import React from 'react';
import {Provider} from '../../rxdux';
//import store from '../../store'; 
import router from '../../router';
import './Main.css';

const store$ = () => {};

const Main = () => (
  <Provider store$={store$}>    
    {router}
  </Provider>
);

export default Main;
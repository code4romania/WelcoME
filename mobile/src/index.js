import React from 'react';

import { Provider } from 'react-redux';

import { store } from './store';

import { RootNavigator } from './routes';

const App = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);
export default App;

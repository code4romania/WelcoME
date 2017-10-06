import { StackNavigator } from 'react-navigation';

import { Login } from './pages/Login';
import { SelectCamp } from './pages/SelectCamp';

export const RootNavigator = StackNavigator({
  Login: {
    screen: Login,
  },
  SelectCamp: {
    screen: SelectCamp,
  },
});

import Rx from 'rxjs';
import store from '.';

export default Rx
    .Observable
    .from(store)
    .map(() => store.getState());
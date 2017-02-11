import Rx from 'rxjs'

import routerStore$ from './router'
import authStore$ from './auth'
import formsStore$ from './forms'
import '../services'
// Combine all stores in one large stores stream
const stores$ = Rx
    .Observable
    .merge(authStore$, routerStore$, formsStore$)
    .scan((store, currentStore) => ({
      ...store,
      ...currentStore
    }))

// debounce all initial states to one render
export default stores$.debounceTime(16)

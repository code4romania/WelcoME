import Rx from 'rxjs'
import counterStore$ from './counter'
import routerStore$ from './router'

// Combine all stores in one large store
const stores$ = Rx.Observable.merge(counterStore$, routerStore$).scan(
    (store, currentStore) => ({...store, ...currentStore})
)

export default stores$

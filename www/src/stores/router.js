import Rx from 'rxjs'
import Rxdux from '../rxdux'

// actions
Rxdux.addActionType('ROUTE_CHANGED')
Rxdux.addActionType('ROUTE_REQUESTED')

// reducer

const routeRequested$ = Rxdux.getPayload(Rxdux.actions.ROUTE_REQUESTED).map(pathname => ({ pendingPathname: pathname }))
const router$ = Rxdux.getPayload(Rxdux.actions.ROUTE_CHANGED).map(route => ({ ...route, pendingPathname: null }))

export default Rx.Observable
    .merge(routeRequested$, router$)
    .scan((state, currentState) => ({
      ...state,
      ...currentState
    }))
    .startWith({
      pendingPathname: null
    })
  .map(router => ({router: { ...router, goToPath: pathname => Rxdux.dispatch(Rxdux.actions.ROUTE_REQUESTED, pathname) }}))

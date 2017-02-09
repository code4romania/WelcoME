import {Observable} from 'rxjs'
import Rxdux from '../rxdux'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const checkIfDifferentLocation = ({location, route}) => {
  console.log('aaa', location, route)
  return !route.key || (location.key !== route.key)
}
// export Actions object in browser for testing
if (process.env.NODE_ENV === 'development') {
  // console.log(Rxdux)
  global.Rxdux = Rxdux
  global.myHistory = history
}
console.log(history)
Rxdux.addActionType('ROUTE_CHANGED')
const router$ = Rxdux
  .getPayload(Rxdux.actions.ROUTE_CHANGED)
  .startWith({})

export default Rxdux
  .mergeKeys({router$})
  .scan((store, currentStore) => ({
    ...store,
    ...currentStore
  }))

// service navigate when action dispatched
Rxdux
  .getPayload(Rxdux.actions.ROUTE_CHANGED)
  .withLatestFrom(Observable.of(history.location), (route, location) => ({location, route}))
  .filter(({location, route}) => true)
  .pluck('route')
  .subscribe(v => console.log('pp', v))
// .do(route => route.pathname && history.push(route.pathname)) service dispatch

// route from history
Observable
  .fromEventPattern(history.listen)
  .merge(Observable.of(history.location))
  .withLatestFrom(router$, (location, route) => ({location, route}))
  .filter(checkIfDifferentLocation)
  .pluck('location')
  //.subscribe(v => console.log('pp1', v))
  .do(location => {
    console.log('aaaaaaaaaa',location)
    Rxdux.dispatch(Rxdux.actions.ROUTE_CHANGED, location)
  })

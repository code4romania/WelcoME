// syncronizing store with history

import Rxdux from '../rxdux'
import { Observable } from 'rxjs'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

// export Actions object in browser for testing
if (process.env.NODE_ENV === 'development') {
  global.Rxdux = Rxdux
  global.rxduxHistory = history
}

// service navigate when action dispatched
Rxdux
  .getPayload(Rxdux.actions.ROUTE_REQUESTED)
  .filter(pathname => pathname && (history.location.pathname !== pathname))
  .subscribe(history.push)

// route from history
Observable
  .fromEventPattern(history.listen)
  .merge(Observable.of(history.location))

  // history changes key with the same pathname for many debounceTime so ignoring multiple event call
  .debounceTime(16)
  .withLatestFrom(Rxdux
    .getPayload(Rxdux.actions.ROUTE_CHANGED).startWith({}), (location, route) => ({location, route}))
  .filter((location, route) => !route.pathname || (route.pathname !== location.pathname))
  .pluck('location')
  .subscribe(location => Rxdux.dispatch(Rxdux.actions.ROUTE_CHANGED, location))

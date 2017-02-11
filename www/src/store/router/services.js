// syncronizing store with history
import {payloads$, Actions, Handlers} from '../../rxdux'
import { Observable } from 'rxjs'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

// if route is requested history will navigate to it
payloads$(Actions.ROUTE_REQUESTED)
  .filter(pathname => pathname && (history.location.pathname !== pathname))
  .subscribe(history.push)

// all routes pulled from history event are dispatched into router store
Observable
  .fromEventPattern(history.listen)
  .merge(Observable.of(history.location))
  // history changes key with the same pathname for many times, so ignoring multiple event call
  .debounceTime(16)
  .withLatestFrom(payloads$(Actions.ROUTE_CHANGED).startWith({}), (location, route) => ({location, route}))
  .filter((location, route) => !route.pathname || (route.pathname !== location.pathname))
  .pluck('location')
  .subscribe(Handlers.changeRoute)

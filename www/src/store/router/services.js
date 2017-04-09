// syncronizing store with history
import {payloads$, Actions, Handlers} from '../../rxdux'
import { Observable } from 'rxjs'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

// if route is requested history will navigate to it if route if different then current route
// or will invoke route resolved if is the same route
payloads$(Actions.ROUTE_REQUESTED)
  .subscribe(pathname => {
    if (pathname && (history.location.pathname !== pathname)) {
      history.push(pathname)
    } else {
      Handlers.routeResolved()
    }
  })

// all routes pulled from history event are dispatched into router store
Observable
  // all changes in history
  .fromEventPattern(history.listen)
  // starting with current route
  .merge(Observable.of(history.location))
  // only distinct pathnames
  .distinctUntilChanged((route, oldroute) => route.pathname === oldroute.pathname)
  .subscribe(route => Handlers.changeRoute(route))

// Make the landing page be login
history.push('/login');

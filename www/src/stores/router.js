
import {Observable} from 'rxjs'
import Rxdux from '../rxdux'
import {browserHistory as history} from 'react-router'

// export Actions object in browser for testing
if (process.env.NODE_ENV === 'development') {
  console.log(Rxdux)
  global.Rxdux = Rxdux
  global.history1 = history
}

Observable.fromEventPattern(history.listen)
   .merge(Observable.of(history.getCurrentLocation()))
   .subscribe(console.log)

Rxdux.addActionType('ROUTE_CHANGED')

const router$ = Rxdux.getPayload(Rxdux.actions.ROUTE_CHANGED)

export default router$.scan(
    (store, currentStore) => ({...store, ...currentStore})
)

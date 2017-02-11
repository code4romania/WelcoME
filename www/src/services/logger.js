// log actions to console
import { actions$, store$ } from '../rxdux'

if (process.env.NODE_ENV === 'development') {
  actions$().subscribe(action => console.info('Action', action))
  store$.subscribe(state => console.info('State', state))
}

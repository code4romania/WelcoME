// log actions to console
import { actions$, store$ } from '../../rxdux'

if (process.env.NODE_ENV === 'development') {
  global.clog = f => {
    console.log(f)
    return f
  }
  actions$().subscribe(action => console.info('Action', action))
  store$.subscribe(state => console.info('State', state))
}

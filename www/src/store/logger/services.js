// log actions to console
import { actions$, store$ } from '../../rxdux'
import { FirebaseAuth } from '../../firebase'
if (process.env.NODE_ENV === 'development') {
  // used for console logging the arrow function f => g ====> f => clog(g) without {}
  global.clog = f => {
    console.log(f)
    return f
  }
  global.FirebaseAuth = FirebaseAuth
  // actions stream
  actions$().subscribe(action => console.info('Action', action))
  // state stream
  store$.subscribe(state => console.info('State', state))
}

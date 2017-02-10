// log actions to console
import Rxdux from '../rxdux'

if (process.env.NODE_ENV === 'development') {
  Rxdux.getAction().subscribe(action => console.info('Action', action))
}

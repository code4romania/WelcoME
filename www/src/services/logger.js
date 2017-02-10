// log actions to console
import Rxdux from '../rxdux'

Rxdux.getAction().subscribe(action => console.info('Action', action))

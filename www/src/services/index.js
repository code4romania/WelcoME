
import Rxdux from '../rxdux'


Rxdux.getAction().subscribe(action => console.log('Action', action))
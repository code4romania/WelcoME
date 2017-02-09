
// test store
import Rx from 'rxjs'
import Rxdux from '../rxdux'
import {add} from 'ramda'

Rxdux.addActionType('COUNTER_INCREASED')
Rxdux.addActionType('COUNTER_DECREASED')

// helper streams
const increase$ = Rxdux.getPayload(Rxdux.actions.COUNTER_INCREASED).mapTo(1)
const decrease$ = Rxdux.getPayload(Rxdux.actions.COUNTER_DECREASED).mapTo(-1)

// state stream
const count$ = Rx.Observable.merge(increase$, decrease$).scan(add).startWith(0)

// action stream
const increaseCount$ = Rx.Observable.of(() => Rxdux.dispatch(Rxdux.actions.COUNTER_INCREASED))
const decreaseCount$ = Rx.Observable.of(() => Rxdux.dispatch(Rxdux.actions.COUNTER_DECREASED))

export default Rxdux.mergeKeys({count$, increaseCount$, decreaseCount$}).scan((store, currentStore) => ({...store, ...currentStore}))

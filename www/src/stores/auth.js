// auth store
import Rx from 'rxjs'
import Rxdux from '../rxdux'

// actions
Rxdux.addActionType('AUTH_USER')
Rxdux.addActionType('AUTH_ERROR')
Rxdux.addActionType('AUTH_REQUESTED')

// reducers
const authRequested$ = Rxdux
    .getPayload(Rxdux.actions.AUTH_REQUESTED)
    .mapTo({pending: true})
const authError$ = Rxdux
    .getPayload(Rxdux.actions.AUTH_ERROR)
    .map(error => ({authenticated: false, pending: false, user: null, error: error}))
const authUser$ = Rxdux
    .getPayload(Rxdux.actions.AUTH_USER)
    .map(user => ({
      authenticated: !!user,
      pending: false,
      user,
      error: null
    }))

export default Rx
    .Observable
    .merge(authRequested$, authError$, authUser$)
    .scan((state, currentState) => ({
      ...state,
      ...currentState
    }))
    .startWith({
      authenticated: false,
      user: null,
      profile: {
        received: false,
        name: '',
        surname: ''
      },
      pending: true,
      error: null
    }).map(auth => ({ auth }))

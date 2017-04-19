// router store
import { registerAction, Reducers, Handlers, dispatch, Actions } from '../../rxdux'

// actions
registerAction('ROUTE_CHANGED')
registerAction('ROUTE_REQUESTED')

// handlers - action creators
// *** UI will send a ROUTE_REQUESTED action, there is a routing service
// *** that will intercept it and dispatch a ROUTE_CHANGE with all infos, updating the state

// used from UI for routing
Handlers.goToPath = pathname => dispatch(Actions.ROUTE_REQUESTED, pathname)
// used from services
Handlers.changeRoute = location => dispatch(Actions.ROUTE_CHANGED, location)

// reducer
const initialState = {}

Reducers.router = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ROUTE_CHANGED:
      return {
        ...action.payload,
        oldPathname: state.pathname + state.search
      }
    default:
      return state
  }
}

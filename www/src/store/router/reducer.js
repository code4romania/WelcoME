// router store
import { registerAction, Reducers, Handlers, dispatch, Actions } from '../../rxdux'

// actions
registerAction('ROUTE_CHANGED')
registerAction('ROUTE_REQUESTED')
registerAction('ROUTE_RESOLVED')

// handlers - action creators
// *** UI will send a ROUTE_REQUESTED action, there is a routing service
// *** that will intercept it and dispatch a ROUTE_CHANGE with all infos, updating the state

// used from UI for routing
Handlers.goToPath = pathname => dispatch(Actions.ROUTE_REQUESTED, pathname)
// used from services
Handlers.changeRoute = location => dispatch(Actions.ROUTE_CHANGED, location)
// when is requested the route as current route service will cancel pendingPathname
// because ROUTE_CHANGE doesn't happen twice
Handlers.routeResolved = () => dispatch(Actions.ROUTE_RESOLVED)

// reducer
const initialState = {
  pathname: '/login',
}

Reducers.router = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ROUTE_REQUESTED:
      return {
        ...state,
        pendingPathname: action.payload
      }
    case Actions.ROUTE_RESOLVED:
      return {
        ...state,
        pendingPathname: null
      }
    case Actions.ROUTE_CHANGED:
      return {
        ...state,
        ...action.payload,
        pendingPathname: null
      }
    default:
      return state
  }
}

// router store
import { registerAction, Reducers, Handlers, dispatch, Actions } from '../../rxdux'

// actions
registerAction('ROUTE_CHANGED')
registerAction('ROUTE_REQUESTED')
// handlers
Handlers.changeRoute = location => dispatch(Actions.ROUTE_CHANGED, location)

// reducer
const initialState = {}
Reducers.router = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ROUTE_CHANGED:
      return {
        ...state,
        ...action.payload,
        pendingPathname: null
      }
    case Actions.ROUTE_REQUESTED:
      return {
        ...state,
        pendingPathname: action.payload
      }
    default:
      return state
  }
}

// forms store
import { registerAction, Reducers, Actions, Handlers, dispatch } from '../../rxdux'

// actions
registerAction('FIELDS_CHANGED')

// handlers
// *** with forms will have an object will all keys in the state
// when forms keys changes
Handlers.changeFields = (fields) => dispatch(Actions.FIELDS_CHANGED, fields)

// reducer
const initialState = {}
Reducers.forms = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FIELDS_CHANGED:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

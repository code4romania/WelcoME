// forms store
import { registerAction, Reducers, Actions, Handlers, dispatch } from '../../rxdux'

// actions
registerAction('FIELDS_CHANGED')
registerAction('CLEAR_FIELDS')

// handlers
// *** with forms will have an object will all keys in the state
// when forms keys changes
Handlers.changeFields = (fields) => dispatch(Actions.FIELDS_CHANGED, fields)
Handlers.clearFields = () => dispatch(Actions.CLEAR_FIELDS)
// reducer
const initialState = {}
Reducers.forms = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FIELDS_CHANGED:
      return {
        ...state,
        ...action.payload
      }
    case Actions.CLEAR_FIELDS:
      return {}
    default:
      return state
  }
}

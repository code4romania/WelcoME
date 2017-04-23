// forms store
import { registerAction, Reducers, Actions, Handlers, dispatch } from '../../rxdux'

// actions
registerAction('FIELDS_CHANGED')
registerAction('CLEAR_FIELDS')

// handlers
// *** with forms will have an object will all keys in the state
// when forms keys changes
Handlers.changeFields = (form, fields) => dispatch(Actions.FIELDS_CHANGED, {form, fields})
Handlers.clearFields = (form, fields) => dispatch(Actions.CLEAR_FIELDS, {form, fields})
// reducer
const initialState = {
  signup: {},
  account: {}
}
Reducers.forms = (state = initialState, action) => {
  const {form, fields} = action.payload || {}
  if (!form) {
    return state
  }

  switch (action.type) {
    case Actions.FIELDS_CHANGED:
      return {
        ...state,
        [form]: {
          ...state[form],
          ...fields
        }
      }
    case Actions.CLEAR_FIELDS:
      return {
        ...state,
        [form]: {
          ...fields
        }
      }
    default:
      return state
  }
}

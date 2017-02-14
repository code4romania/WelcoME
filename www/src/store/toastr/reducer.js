// forms store
import { registerAction, Reducers, Actions, Handlers, dispatch } from '../../rxdux'
import { guid } from './utils'
// actions
registerAction('ADD_TOASTR')
registerAction('REMOVE_TOASTR')
registerAction('CLEAN_TOASTRS')

// handlers
Handlers.addToastr = (toastr) => dispatch(Actions.ADD_TOASTR, {id: guid(), ...toastr})
Handlers.cleanToastrs = () => dispatch(Actions.CLEAN_TOASTRS, {})
Handlers.removeToastr = (id) => dispatch(Actions.REMOVE_TOASTR, id)

// reducer
const initialState = []

Reducers.toastrs = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_TOASTR:
      const {payload: { title, message, options, id, type }} = action
      return [ {
        id,
        type,
        title,
        message,
        options
      }, ...state ]
    case Actions.REMOVE_TOASTR:
      return state.filter(toastr => toastr.id !== action.payload)

    case Actions.CLEAN_TOASTRS:
      return []
    default:
      return state
  }
}

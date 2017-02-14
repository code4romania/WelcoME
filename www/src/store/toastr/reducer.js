// forms store
import { registerAction, Reducers, Actions, Handlers, dispatch } from '../../rxdux'
// actions
registerAction('ADD_TOASTR')
registerAction('REMOVE_TOASTR')
registerAction('CLEAN_TOASTRS')

// handlers
Handlers.addToastr = toastr => dispatch(Actions.ADD_TOASTR, { ...toastr })
Handlers.cleanToastrs = () => dispatch(Actions.CLEAN_TOASTRS)
Handlers.removeToastr = id => dispatch(Actions.REMOVE_TOASTR, id)

// reducer
const initialState = []

Reducers.toastrs = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_TOASTR:
      const {payload: { title, message, options, id, type }} = action
      return id ? [ {
        id,
        type,
        title,
        message,
        options
      }, ...state.filter(s => s.id !== id) ] : state
    case Actions.REMOVE_TOASTR:
      return state.filter(toastr => toastr.id !== action.payload)
    case Actions.CLEAN_TOASTRS:
      return []
    default:
      return state
  }
}

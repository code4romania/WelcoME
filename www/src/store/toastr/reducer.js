// forms store
import { registerAction, Reducers, Actions, Handlers, dispatch } from '../../rxdux'
import { guid } from './utils'
// actions
registerAction('ADD_TOASTR')
registerAction('REMOVE_TOASTR')
registerAction('CLEAN_TOASTR')
registerAction('SHOW_CONFIRM')
registerAction('HIDE_CONFIRM')
registerAction('REMOVE_BY_TYPE')

// handlers
Handlers.addToastr = (toastr) => dispatch(Actions.ADD_TOASTR, toastr)
Handlers.cleanToastr = () => dispatch(Actions.CLEAN_TOASTR)
Handlers.removeToastr = (params) => dispatch(Actions.REMOVE_TOASTR, params)
Handlers.showConfirmToastr = (obj) => dispatch(Actions.SHOW_CONFIRM, obj)
Handlers.hideConfirmToastr = () => dispatch(Actions.HIDE_CONFIRM)
Handlers.removeByTypeToastr = (payload) => dispatch(Actions.REMOVE_BY_TYPE, payload)

// reducer
const initialState = {
  toastrs: [],
  confirm: null
}

Reducers.toastr = (state = initialState, action) => {
  const {type, payload: { title, message, options, id }} = action
  let newState
  switch (type) {
    case Actions.ADD_TOASTR:
      const newToastr = {
        id: guid(),
        type,
        title,
        message,
        options
      }
      newState = {}
      newState = {
        ...state,
        toastrs: [
          newToastr,
          ...state.toastrs
        ]
      }
      return newState

    case Actions.REMOVE_TOASTR:
      newState = {
        ...state,
        toastrs: state.toastrs.filter(toastr => toastr.id !== id)
      }
      return newState
    case Actions.REMOVE_BY_TYPE:
      newState = {
        ...state,
        toastrs: state.toastrs.filter(toastr => toastr.type !== type)
      }
      return newState
    case Actions.CLEAN_TOASTR:
      return {
        ...state,
        toastrs: []
      }
    case Actions.SHOW_CONFIRM:
      return {
        ...state,
        confirm: {
          id: guid(),
          show: true,
          message,
          options: options || {}
        }
      }
    case Actions.HIDE_CONFIRM:
      return {
        ...state,
        confirm: null
      }
    default:
      return state
  }
}

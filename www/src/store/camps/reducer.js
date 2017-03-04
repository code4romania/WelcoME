// forms store
import { registerAction, Reducers, Actions, Handlers, dispatch } from '../../rxdux'

// actions
registerAction('CAMPS_CHANGED')
registerAction('ADD_EMPTY_CAMP')
registerAction('REMOVE_CAMP')
registerAction('UPDATE_CAMP')
registerAction('SELECT_CAMP')

// handlers
Handlers.addEmptyCamp = camp => dispatch(Actions.ADD_EMPTY_CAMP, camp)
Handlers.removeCamp = cid => dispatch(Actions.REMOVE_CAMP, cid)
Handlers.updateCamp = camp => dispatch(Actions.UPDATE_CAMP, camp)
Handlers.selectCamp = cid => dispatch(Actions.SELECT_CAMP, cid)
Handlers.campsChanged = camps => dispatch(Actions.CAMPS_CHANGED, camps)

// reducer
const initialState = {
  camps: {},
  selectedCamp: null
}

Reducers.camps = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_EMPTY_CAMP:
    case Actions.REMOVE_CAMP:
    case Actions.UPDATE_CAMP:
      return state
    case Actions.SELECT_CAMP:
      return {
        ...state,
        selectedCamp: action.payload && Object.keys(state.camps).some(cid => cid === action.payload) ? action.payload : null
      }
    case Actions.CAMPS_CHANGED:
      return {
        ...state,
        camps: action.payload || {}
      }
    default:
      return state
  }
}

// forms store
import { registerAction, Reducers, Actions, Handlers, dispatch } from '../../rxdux'

// actions
registerAction('ADD_CAMP')
registerAction('ADDED_CAMP')
registerAction('REMOVE_CAMP')
registerAction('REMOVED_CAMP')
registerAction('UPDATE_CAMP')
registerAction('UPDATED_CAMP')
registerAction('SELECT_CAMP')

// handlers
Handlers.addCamp = camp => dispatch(Actions.ADD_CAMP, camp)
Handlers.addedCamp = camp => dispatch(Actions.ADDED_CAMP, camp)
Handlers.removeCamp = cid => dispatch(Actions.REMOVE_CAMP, cid)
Handlers.removedCamp = cid => dispatch(Actions.REMOVED_CAMP, cid)
Handlers.updateCamp = camp => dispatch(Actions.UPDATE_CAMP, camp)
Handlers.updatedCamp = camp => dispatch(Actions.UPDATED_CAMP, camp)
Handlers.selectCamp = cid => dispatch(Actions.SELECT_CAMP, cid)
// reducer
const initialState = {
  camps: [],
  selectedCamp: null
}

Reducers.campadmin = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_CAMP:
    case Actions.REMOVE_CAMP:
    case Actions.UPDATE_CAMP:
      return state
    case Actions.SELECT_CAMP:
      return {
        ...state,
        selectedCamp: action.payload && state.camps.some(camp => camp.cid === action.payload) ? action.payload : null
      }
    case Actions.ADDED_CAMP:
      return {
        ...state,
        camps: [...state.camps, action.payload]
      }
    case Actions.REMOVED_CAMP:
      return {
        ...state,
        camps: state.camps.filter(camp => camp.cid !== action.payload)
      }
    case Actions.UPDATED_CAMP:
      return {
        ...state,
        camps: [...state.camps.filter(camp => camp.cid !== action.payload), action.payload]
      }
    default:
      return state
  }
}

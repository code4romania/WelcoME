// forms store
import { registerAction, Reducers, Actions, Handlers, dispatch } from '../../rxdux'

// actions
registerAction('CAMPS_CHANGED_PUBLIC')
registerAction('CAMPS_CHANGED_PRIVATE')
registerAction('REMOVE_CAMPS_PRIVATE')
registerAction('ADD_EMPTY_CAMP')
registerAction('REMOVE_CAMP')
registerAction('UPDATE_CAMP')
registerAction('SELECT_CAMP')

// handlers
Handlers.addEmptyCamp = camp => dispatch(Actions.ADD_EMPTY_CAMP, camp)
Handlers.removeCamp = cid => dispatch(Actions.REMOVE_CAMP, cid)
Handlers.updateCamp = camp => dispatch(Actions.UPDATE_CAMP, camp)
Handlers.selectCamp = cid => dispatch(Actions.SELECT_CAMP, cid)
Handlers.campsChangedPublic = camps => dispatch(Actions.CAMPS_CHANGED_PUBLIC, camps)
Handlers.campsChangedPrivate = camps => dispatch(Actions.CAMPS_CHANGED_PRIVATE, camps)
Handlers.removeCampsPrivate = () => dispatch(Actions.REMOVE_CAMPS_PRIVATE)
// reducer
const initialState = {
  public: {},
  private: {},
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
        selectedCamp: action.payload && Object.keys(state.public).some(cid => cid === action.payload) ? action.payload : null
      }
    case Actions.CAMPS_CHANGED_PUBLIC:
      return {
        ...state,
        public: action.payload || {}
      }
    case Actions.CAMPS_CHANGED_PRIVATE:
      return {
        ...state,
        private: action.payload || {}
      }
    case Actions.REMOVE_CAMPS_PRIVATE:
      return {
        ...state,
        private: {}
      }
    default:
      return state
  }
}

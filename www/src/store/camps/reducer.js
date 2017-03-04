// forms store
import { registerAction, Reducers, Actions, Handlers, dispatch } from '../../rxdux'

// actions
registerAction('CAMPS_CHANGED')
registerAction('ADD_EMPTY_CAMP')
registerAction('REMOVE_CAMP')
registerAction('UPDATE_CAMP')
registerAction('SELECT_CAMP')
registerAction('USERS_CHANGE')
registerAction('ONEUSER_CHANGE')
registerAction('MAKE_ADMIN')
registerAction('REMOVE_ADMIN')

// handlers
Handlers.addEmptyCamp = camp => dispatch(Actions.ADD_EMPTY_CAMP, camp)
Handlers.removeCamp = cid => dispatch(Actions.REMOVE_CAMP, cid)
Handlers.updateCamp = camp => dispatch(Actions.UPDATE_CAMP, camp)
Handlers.selectCamp = cid => dispatch(Actions.SELECT_CAMP, cid)
Handlers.campsChanged = camps => dispatch(Actions.CAMPS_CHANGED, camps)
Handlers.usersChanged = uids => dispatch(Actions.USERS_CHANGE, uids)
Handlers.userChange = (uid, volunteer) => dispatch(Actions.ONEUSER_CHANGE, { [uid]: volunteer })

Handlers.makeAdmin = (uid, cid) => dispatch(Actions.MAKE_ADMIN, {uid, cid})
Handlers.removeAdmin = (uid, cid) => dispatch(Actions.REMOVE_ADMIN, {uid, cid})
// reducer
const initialState = {
  camps: {},
  userList: [],
  users: {},
  selectedCamp: null
}

Reducers.camps = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_EMPTY_CAMP:
    case Actions.REMOVE_CAMP:
    case Actions.UPDATE_CAMP:
    case Actions.MAKE_ADMIN:
    case Actions.REMOVE_ADMIN:
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
    case Actions.USERS_CHANGE:
      return {
        ...state,
        userList: action.payload ? {...state.userList, ...action.payload} : {}
      }
    case Actions.ONEUSER_CHANGE:
      return {
        ...state,
        users: {...state.users, ...action.payload}
      }

    default:
      return state
  }
}

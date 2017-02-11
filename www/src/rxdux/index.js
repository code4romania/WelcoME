
import { Subject } from 'rxjs'

// actions
export const Actions = {}
export const registerAction = type => { Actions[type] = type }

const dispatcher = new Subject()
const dispatcher$ = dispatcher.asObservable().publishReplay(1).refCount()

// dispatch an action
export const dispatch = (type, payload = null) => { dispatcher.next({type, payload}) }

// actions stream
export const actions$ = (...args) => !args.length ? dispatcher$ : dispatcher$.filter(action => Object.keys(args).some(key => args[key] === action.type))
export const payloads$ = (...args) => actions$(...args).pluck('payload')

// handlers - action creators
export const Handlers = {}

// reducers
export const Reducers = {}
export const combineReducers = (reducers) => (state = {}, action) =>
  Object.keys(reducers).reduce((newState, key) => ({...newState, [key]: reducers[key](newState[key], action)}), state)

// store
export const store$ = actions$().scan(combineReducers(Reducers), {})

global.Reducers = Reducers
global.combineReducers = combineReducers

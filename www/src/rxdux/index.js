// Singleton rxdux
import { Subject, Observable } from 'rxjs'

export default (() => {
  const __ = {}
  __.actions = {}
  const __dispatcher = new Subject()
  const _dispatcher = __dispatcher.asObservable().publishReplay(1).refCount()

  __.addActionType = type => {
    if ((typeof type === 'string') && (type.length) && (type === type.toUpperCase())) {
      __.actions[type] = type
    } else {
      throw new Error('Actions must be CAPS strings!')
    }
  }
  // dispatch an action
  __.dispatch = (type, payload = null) => {
    if (!__.actions.hasOwnProperty(type)) {
      throw new Error(`Tried to dispatch an unknown action. 
                     Action type: ${type}. 
                     Please make sure actions you use are in the
                     list of known actions.`)
    }
    const action = {type, payload}
    __dispatcher.next(action)
  }

  const buildFilterFunction = args => {
    // Check if has actions
    const hasActions =
    Object.keys(args)
      .some(key => Object.keys(__.actions).indexOf(args[key]) !== -1)

    if (!hasActions) {
      throw new Error('Invalid filters provided to dispatcher func')
    }

    return (message) => {
      // If filter args have actions to filter by them
      return (
      Object.keys(args)
        .some(key => args[key] === message.type)
      )
    }
  }

  __.getAction = (...args) => {
    let filteredDispatcher

    if (args.length === 0) {
      filteredDispatcher = _dispatcher
    } else if (typeof args[0] === 'function') {
      filteredDispatcher = _dispatcher.filter(args[0])
    } else {
      // Sugaring for filtering by actions
      // arguments's values are the actions we would like to filter by
      filteredDispatcher = _dispatcher.filter(buildFilterFunction(args))
    }

    // After we have filtered, the only data that is interesting is under the data key
    return filteredDispatcher
  }

  __.getPayload = (...args) => {
    // We usually only need the data prop, so pluck it by
    // default
    return (
    __.getAction(...args)
      .pluck('payload')
    )
  }

  // create reducer from stream name without $
  __.mergeKeys = observables => Observable.merge(...Object.keys(observables)
    .map(k => observables[k].map(kk => ({[k[k.length - 1] === '$' ? k.substring(0, k.length - 1) : k]: kk}))))

  return Object.freeze(__)
})()

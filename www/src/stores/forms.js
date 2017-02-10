// forms store
import Rxdux from '../rxdux'

// actions
Rxdux.addActionType('FIELD_CHANGED')

// reducers
const forms$ = Rxdux
    .getPayload(Rxdux.actions.FIELD_CHANGED)
    .startWith({})
    .map(field => (field && field.key ? {[field.key]: field.value} : {}))

export default forms$
    .map(forms => ({ forms: { ...forms, changeField: field => Rxdux.dispatch(Rxdux.actions.FIELD_CHANGED, field) } }))

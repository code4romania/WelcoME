// forms store
import Rx from 'rxjs'
import Rxdux from '../rxdux'

// actions
Rxdux.addActionType('FIELD_CHANGED')
Rxdux.addActionType('FIELDS_CHANGED')

// reducers
const fieldChanged$ = Rxdux
    .getPayload(Rxdux.actions.FIELD_CHANGED)
    .map(field => (field && field.formKey
        ? {
          [field.formKey]: field.value
        }
        : {}))
const fieldsChanged$ = Rxdux.getPayload(Rxdux.actions.FIELDS_CHANGED)

export default Rx
    .Observable
    .merge(fieldChanged$, fieldsChanged$)
    .scan((state, currentState) => ({
      ...state,
      ...currentState
    }))
    .startWith({})
    .map(forms => ({
      forms: {
        ...forms,
        changeField: field => Rxdux.dispatch(Rxdux.actions.FIELD_CHANGED, field)
      }
    }))

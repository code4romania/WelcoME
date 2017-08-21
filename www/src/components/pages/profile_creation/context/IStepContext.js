
const IStepContext = (props, context) => {
  const state = context.store;
  const handlers = context.handlers;
  const forms = state.forms;

  // shared step context functionality
  return {
    onChangeKey: (key, value, store = 'account') => handlers.changeFields(
      store, // same
      {[key]: value },
    ),
    getFormValue: (field, store = 'account') => !!forms[store]
      ? forms[store][field]
      : '',
  }
}

export default IStepContext;

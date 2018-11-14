const fieldValidations = {

}

export default function fieldValidation(context, state, action) {
  const validate = fieldValidations[context]

  if (!validate) {
    return state
  }

  return {
    ...state,
    [context]: validate(state[context], action)
  }
}

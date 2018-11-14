const formValidations = {

}

export default function formValidation(context, state) {
  const { fields, current } = state[context]
  const validate = formValidations[context]

  if (!validate) {
    return state
  }

  return {
    ...state,
    isValid: validate({fields, current}),
  }
}

import dataset from './dataset'

const formValidations = {
  dataset,
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

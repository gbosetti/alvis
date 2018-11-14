import formValidation from 'infovis/helpers/form-validation'

export default function datasetFormValidation(state, action) {
  const { fields } = state

  void action
  void fields

  return (
    formValidation(state)
  )
}

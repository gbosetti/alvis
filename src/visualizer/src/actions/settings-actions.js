import browser from 'webextension-polyfill'
import {
  GET_DATASET_SETTINGS_REQUEST,
  GET_DATASET_SETTINGS_SUCCESS,
  GET_DATASET_SETTINGS_FAILURE,

  ON_SETTINGS_FORM_FIELD_CHANGE,
  ON_SETTINGS_FORM_CLEAR,
} from 'infovis/constants/settings.constants'
import {
  actionRequest,
  actionSuccess,
  actionFailure
} from 'infovis/helpers/action-dispatcher'

export function onSettingsFormClear(context, options) {
  options = options || { error: true, success: true }

  return {
    type: ON_SETTINGS_FORM_CLEAR,
    payload: {
      context,
      options,
    },
  }
}

export function onSettingsFormFieldChange(context, field, value) {
  return {
    type: ON_SETTINGS_FORM_FIELD_CHANGE,
    payload: { context, field, value },
  }
}

export function getDatasetViewSettings() {
  return dispatch => {
    dispatch(actionRequest(GET_DATASET_SETTINGS_REQUEST))
    return browser.runtime.sendMessage({ call: 'getDatasetViewSettings' })
      .then(settings => {
        if (settings) {
          return dispatch(actionSuccess(GET_DATASET_SETTINGS_SUCCESS, 'dataset', settings))
        }
        
        throw new Error('No settings provided')
      })
      .catch(err => {
        dispatch(actionFailure(GET_DATASET_SETTINGS_FAILURE, err))
      })
  }
}

export default {
  onSettingsFormClear,
  onSettingsFormFieldChange,
  getDatasetViewSettings,
}

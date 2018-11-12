import browser from 'webextension-polyfill'
import {
  GET_DATASET_VIEW_SETTINGS_REQUEST,
  GET_DATASET_VIEW_SETTINGS_SUCCESS,
  GET_DATASET_VIEW_SETTINGS_FAILURE,
} from 'infovis/constants/settings.constants'
import {
  actionRequest,
  actionSuccess,
  actionFailure
} from 'infovis/helpers/action-dispatcher'

export function getDatasetViewSettings() {
  return dispatch => {
    dispatch(actionRequest(GET_DATASET_VIEW_SETTINGS_REQUEST))
    return browser.runtime.sendMessage({ call: 'getDatasetViewSettings' })
      .then(settings => {
        if (settings) {
          return dispatch(actionSuccess(GET_DATASET_VIEW_SETTINGS_SUCCESS, 'dataset', settings))
        }
        
        throw new Error('No settings provided')
      })
      .catch(err => {
        dispatch(actionFailure(GET_DATASET_VIEW_SETTINGS_FAILURE, err))
      })
  }
}

export default {
  getDatasetViewSettings,
}

import browser from 'webextension-polyfill'
import { sanitize } from 'infovis/helpers/data-processor'
import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE
} from 'infovis/constants/data.constants'

import {
  actionRequest,
  actionSuccess,
  actionFailure
} from 'infovis/helpers/action-dispatcher'

export function getData() {
  return dispatch => {
    dispatch(actionRequest(GET_DATA_REQUEST))
    return browser.runtime.sendMessage({ call: 'notifyDocumentLoaded' })
      .then(dataset => {
        if (dataset && dataset.currentDataset) {
          dispatch(actionSuccess(GET_DATA_SUCCESS, 'dataset', sanitize(dataset.currentDataset)))
          return null
        }
        
        throw new Error('No dataset provided')
      })
      .catch(err => {
        dispatch(actionFailure(GET_DATA_FAILURE, err))
      })
  }
}

export default {
  getData,
}

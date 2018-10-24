import {
  SET_STATE,
} from 'infovis/constants'
  
import initialState from 'infovis/states/data-state'

/**
 * ## dataReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function dataReducer(state = initialState, action) {
  switch (true) {
    case RegExp('.*data.*-request').test(action.type):
    {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }

    case RegExp('.*data.*-success').test(action.type):
    {
      const { name, data } = action.payload

      return {
        ...state,
        isFetching: false,
        error: null,
        [name]: data,
      }
    }

    case RegExp('.*data.*-failure').test(action.type):
    {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        success: null,
      }
    }

    case SET_STATE === action.type:
    {
      const {
        data
      } = JSON.parse(action.payload)

      return {
        ...state,
        ...data
      }
    }


    default:
    {
      return state
    }
  }
}

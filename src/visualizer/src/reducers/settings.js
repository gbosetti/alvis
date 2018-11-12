import {
  SET_STATE,
} from 'infovis/constants'
    
import initialState from 'infovis/states/settings-state'
  
/**
   * ## settingsReducer function
   * @param {Object} state - initialState
   * @param {Object} action - type and payload
   */
export default function settingsReducer(state = initialState, action) {
  switch (true) {
    case RegExp('.*settings.*-request').test(action.type):
    {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
  
    case RegExp('.*settings.*-success').test(action.type):
    {
      const { name, data } = action.payload
  
      return {
        ...state,
        isFetching: false,
        error: null,
        [name]: {
          current: {
            ...state[name].current,
            ...data,
          },
          fields: {
            ...state[name].fields,
            ...data,
          },
        },
      }
    }
  
    case RegExp('.*settings.*-failure').test(action.type):
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
        settings
      } = JSON.parse(action.payload)
  
      return {
        ...state,
        ...settings,
      }
    }
  
  
    default:
    {
      return state
    }
  }
}
  
import {
  ON_SETTINGS_FORM_CLEAR,
  ON_SETTINGS_FORM_FIELD_CHANGE,

  SET_STATE,
} from 'infovis/constants'    
import initialState from 'infovis/states/settings-state'
import formValidation from './form'
import fieldValidation from './field'

  
/**
   * ## settingsReducer function
   * @param {Object} state - initialState
   * @param {Object} action - type and payload
   */
export default function settingsReducer(state = initialState, action) {
  var nextSettingsState

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

    case ON_SETTINGS_FORM_CLEAR === action.type:
    {
      const { context, options } = action.payload

      nextSettingsState = {
        ...state,
      }

      if (context) {
        nextSettingsState[context] = initialState[context]
      }

      Object.keys(options || {})
        .filter(option => options[option])
        .forEach(option => {
          nextSettingsState[option] = initialState[option]
        })

      return nextSettingsState
    }

    case ON_SETTINGS_FORM_FIELD_CHANGE === action.type:
    {
      const {
        context,
        field,
        value,
      } = action.payload

      const contextData = state[context]

      nextSettingsState = {
        error: null,
        success: null,
        [context]: {
          ...contextData,
          fields: {
            ...contextData.fields,
            [field]: value,
          },
        }
      }

      return formValidation(context, fieldValidation(context, nextSettingsState, action), action)
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
  
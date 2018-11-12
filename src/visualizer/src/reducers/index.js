import { combineReducers } from 'redux'

import dataReducer from './data'
import globalReducer from './global'
import settingsReducer from './settings'

export default combineReducers({
  data: dataReducer,
  global: globalReducer,
  settings: settingsReducer,
})

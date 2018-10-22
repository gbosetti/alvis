import { combineReducers } from 'redux'

import dataReducer from './data'
import globalReducer from './global'

export default combineReducers({
  data: dataReducer,
  global: globalReducer,
})

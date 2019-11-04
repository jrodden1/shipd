import { combineReducers } from 'redux'
import packageReducer from './packageReducer.js'
import reportReducer from './reportReducer.js'

export default combineReducers({
  packageReducer,
  reportReducer
})
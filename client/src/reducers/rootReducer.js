import { combineReducers } from 'redux'
import packagesReducer from './packagesReducer.js'
import reportsReducer from './reportsReducer.js'


export const rootReducer = combineReducers(
  {
    packagesReducer,
    reportsReducer
  })  

export default rootReducer;

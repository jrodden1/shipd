import { combineReducers } from 'redux'
import packagesReducer from './packagesReducer.js'
import reportsReducer from './reportsReducer.js'

//rootReducer uses the combineReducers function from redux to combine the reducers.  
//In the MVP this is not needed as reportsReducer is not being used. 
export const rootReducer = combineReducers(
  {
    packagesReducer,
    reportsReducer
  })  

export default rootReducer;

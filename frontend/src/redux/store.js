import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from './AuthSlice'


const reducer = combineReducers({auth:authReducer})

const store = configureStore({
  reducer
  })

  export default store
import { applyMiddleware, combineReducers, createStore } from 'redux'
import authReduser from './auth-reducer'
import ThunkMiddleware from 'redux-thunk'
const rootReducer = combineReducers({
    auth:authReduser
})

export const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware))
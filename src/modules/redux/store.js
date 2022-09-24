import { applyMiddleware, combineReducers, createStore } from 'redux'
import authReduser from './auth-reducer'
import ThunkMiddleware from 'redux-thunk'
import preloaderReducer from './preloader-reducer'
import usersReducer from './users-reducer'


const rootReducer = combineReducers({
    auth: authReduser,
    preloader: preloaderReducer,
    users:usersReducer
})

export const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware))
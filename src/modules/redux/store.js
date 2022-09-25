import { applyMiddleware, combineReducers, createStore } from 'redux'
import authReduser from './auth-reducer'
import ThunkMiddleware from 'redux-thunk'
import preloaderReducer from './preloader-reducer'
import usersReducer from './users-reducer'
import { getContacts } from './contacts-reducer'


const rootReducer = combineReducers({
    auth: authReduser,
    preloader: preloaderReducer,
    users: usersReducer,
    contacts: getContacts
})

export const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware))
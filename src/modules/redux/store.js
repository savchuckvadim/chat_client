import { applyMiddleware, combineReducers, createStore } from 'redux'
import authReduser from './auth-reducer'
import ThunkMiddleware from 'redux-thunk'
import preloaderReducer from './preloader-reducer'
import usersReducer from './users-reducer'
import contactsReducer from './contacts-reducer'
import dialogsReducer from './dialogs-reducer'
import groupReducer from './group-reducer'
import contextMenuReducer from './context-menu-reducer'
import modalReducer from './modal-reducer'


const rootReducer = combineReducers({
    auth: authReduser,
    preloader: preloaderReducer,
    modal:modalReducer,
    users: usersReducer,
    contacts: contactsReducer,
    dialogs: dialogsReducer,
    group: groupReducer,
    contextMenu:contextMenuReducer
})

export const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware))
import { usersAPI } from "../services/api/users-api"
import { isUserActive, precenseUserUtil, setOnlineInAll } from "../utils/users-utils"


const SET_USERS = 'SET_USERS'
const PRELOADER = 'users/PRELOADER'
export const NEW_CONTACT = 'users/dialogs/NEW_CONTACT'
const DELETE_CONTACT = 'users/DELETE_CONTACT'

const SET_ONLINE = 'SET_ONLINE'
const ADD_ONLINE = 'ADD_ONLINE'
const DELETE_ONLINE = 'DELETE_ONLINE'

const initialState = {
    users: [],
    online: [],
    // contacts: [],
    inProgress: false
}
//AC
const setUsers = (users) => ({ type: SET_USERS, users })
const inProgress = (bool) => ({ type: PRELOADER, bool })
const setNewContact = (newContactId) => ({ type: NEW_CONTACT, newContactId })
const unContacted = (deletedContactId) => ({ type: DELETE_CONTACT, deletedContactId })
export const setOnline = (usersIds) => ({ type: SET_ONLINE, usersIds })
export const addOnline = (userId) => ({ type: ADD_ONLINE, userId })
export const deleteOnline = (userId) => ({ type: DELETE_ONLINE, userId })


//THUNK

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(inProgress(true))
    const users = await usersAPI.getUsers(currentPage, pageSize)

    dispatch(setUsers(users))
    dispatch(inProgress(false))

}
export const findUser = (userName) => async (dispatch) => {
    // dispatch(inProgress(true))
    const response = await usersAPI.findUser(userName)

    dispatch(setUsers(response.users))
    // dispatch(inProgress(false))
}
export const addDeleteContact = (user, bool) => async (dispatch) => {
    dispatch(inProgress(true))
    if (bool) {
        await usersAPI.addDeleteContact(user.id)
        dispatch(setNewContact(user.id))
    } else {
        await usersAPI.deleteContact(user.id)
        dispatch(unContacted(user.id))
    }

    dispatch(inProgress(false))
}

// export const precenseUserChanged = (userId, status) => async (dispatch, getState) => {

//     let state = getState()
//     let users = state.users.users
//     let isActive = isUserActive(users, userId)
//     
//     if (isActive !== status) {
//         // dispatch(setPrecenseUser(userId, status))
//         usersAPI.precense(userId, status)
//     }
// }

//REDUCER

const usersReducer = (state = initialState, action) => {
    let resultState = state
    let usersWifthOnline = []
    switch (action.type) {

        case SET_USERS:
            return { ...state, users: action.users };

        case PRELOADER:
            return { ...state, inProgress: action.bool };

        case NEW_CONTACT:
            resultState = { ...state }
            // const isExist = state.contacts.some(contact => contact.id === action.userId)
            // if (!isExist) {

            resultState.users = state.users.map(user => {
                if (user.id === action.newContactId) {

                    return { ...user, isContacted: true }
                }

                return user
            })
            // }

            return resultState

        case DELETE_CONTACT:
            resultState = { ...state }

            resultState.users = state.users.map(user => {
                if (user.id === action.deletedContactId) {
                    user.isContacted = false
                }
                return user
            })

            return resultState

        case SET_ONLINE:

            // usersWifthOnline = setOnlineInAll(state.users, action.usersIds)
            let resUsersSet = setOnlineInAll(state.users, action.usersIds)
            return { ...state, online: action.usersIds, users: resUsersSet }

        case ADD_ONLINE:

            if (!state.online.some(id => id === action.userId)) {
                usersWifthOnline = precenseUserUtil(state.users, action.userId, true)
                let resOnlineAdd = [...state.online, action.userId]
                return { ...state, online: resOnlineAdd, users: usersWifthOnline }
            } else {
                return state
            }

        case DELETE_ONLINE:

            if (!state.online.some(id => id === action.userId)) {
                
                usersWifthOnline = precenseUserUtil(state.users, action.userId, false)
                let resOnlineDelete = [...state.online, action.userId]
                
                return { ...state, online: resOnlineDelete, users: usersWifthOnline }
            } else {
                
                return state
            }

        default:
            return state;
    }
}

export default usersReducer
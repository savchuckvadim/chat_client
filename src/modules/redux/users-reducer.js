import { usersAPI } from "../services/api/users-api"
import { isUserActive, precenseUserUtil, setOnlineInAll } from "../utils/users-utils"
import { PRECENSE_USER, setPrecenseUser } from "./dialogs-reducer"


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

export const getUsers = (currentPage, pageSize) => async (dispatch, getState) => {
    dispatch(inProgress(true))
    const users = await usersAPI.getUsers(currentPage, pageSize)
    const online = getState().users.online
    dispatch(setUsers(users))
    dispatch(setPrecenseUser(online)) //from dialogs-reducer
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
            
            let deleteResultOnline = []
            let checkExistId = false;
            state.online.forEach(userId => {
                if (Number(userId) !== Number(action.userId)) {
                    deleteResultOnline.push(userId)
                }else{
                    checkExistId = true
                }
            })
            if (checkExistId) {
                
                usersWifthOnline = precenseUserUtil(state.users, action.userId, false)
                

                return { ...state, online: deleteResultOnline, users: usersWifthOnline }
            } else {
                
                return state
            }

        case PRECENSE_USER:
            const users = setOnlineInAll(state.users, action.onlineUsersIds)
            return { ...state, users: users }

        default:
            return state;
    }
}

export default usersReducer
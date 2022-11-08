import { usersAPI } from "../services/api/users-api"


const SET_USERS = 'SET_USERS'
const PRELOADER = 'users/PRELOADER'
const NEW_CONTACT = 'users/NEW_CONTACT'
const DELETE_CONTACT = 'users/DELETE_CONTACT'

const initialState = {
    users: [],
    // contacts: [],
    inProgress: false
}
//AC
const setUsers = (users) => ({ type: SET_USERS, users })
export const inProgress = (bool) => ({ type: PRELOADER, bool })
const setNewContact = (newContactId) => ({ type: NEW_CONTACT, newContactId })
const unContacted = (deletedContactId) => ({ type: DELETE_CONTACT, deletedContactId })

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
export const addContact = (userId) => async (dispatch) => {
    dispatch(inProgress(true))
    const response = await usersAPI.addContact(userId)
    dispatch(setNewContact(userId))
    dispatch(inProgress(false))
}

export const deleteContact = (userId) => async (dispatch) => {

    dispatch(inProgress(true))
    await usersAPI.deleteContact(userId)
    dispatch(unContacted(userId))
    dispatch(inProgress(false))
}

//REDUCER

const usersReducer = (state = initialState, action) => {
    let resultState = state
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
                    user.isContacted = true
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
        default:
            return state;
    }
}

export default usersReducer
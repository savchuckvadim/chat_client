import { usersAPI } from "../services/users-api"


const SET_USERS = 'SET_USERS'
const PRELOADER = 'users/PRELOADER'
const NEW_CONTACT = 'NEW_CONTACT'

const initialState = {
    users: [],
    contacts: [],
    inProgress: false
}
//AC
const setUsers = (users) => ({ type: SET_USERS, users })
const inProgress = (bool) => ({ type: PRELOADER, bool })
const setNewContact = (contact) => ({ type: NEW_CONTACT, contact })


//THUNK

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(inProgress(true))
    const users = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(inProgress(false))
    dispatch(setUsers(users))

}

export const addContact = (userId) => async (dispatch) => {
    debugger
    dispatch(inProgress(true))
    const contact = await usersAPI.addContact(userId)
    dispatch(setNewContact(contact))
    dispatch(inProgress(true))
}

//REDUCER

const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USERS:
            return { ...state, users: action.users };

        case PRELOADER:
            return { ...state, inProgress: action.bool };

        case NEW_CONTACT:
            let resultState = { ...state }
            const isExist = state.contacts.some(contact => contact.id === action.userId)
            if (!isExist) {
                resultState.contacts = [...state, action.contact]
                resultState.users = state.users.map(user => {
                    if (user.id === action.userId) {
                        user.isContacted = true
                    }
                    return user
                })
            }
            return resultState
        default:
            return state;
    }
}

export default usersReducer
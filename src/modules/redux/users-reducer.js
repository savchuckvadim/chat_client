import { usersAPI } from "../services/users-api"


const SET_USERS = 'SET_USERS'
const PRELOADER = 'users/PRELOADER'

const initialState = {
    users: [],
    inProgress: false
}
//AC
const setUsers = (users) => ({ type: SET_USERS, users })
const inProgress = (bool) => ({ type: PRELOADER, bool })

//THUNK

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(inProgress(true))
    const users = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(inProgress(false))
    dispatch(setUsers(users))
    


}

//REDUCER

const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USERS:
            return { ...state, users: action.users };

        case PRELOADER:
            return { ...state, inProgress: action.bool };

        default:
            return state;
    }
}

export default usersReducer
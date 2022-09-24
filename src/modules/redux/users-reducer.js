import { usersAPI } from "../services/users-api"

const SET_USERS = 'SET_USERS'


const initialState = {
    users: []
}
//AC
const setUsers = (users) => ({ type: SET_USERS, users })


//THUNK

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    const users = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setUsers(users))

}

//REDUCER

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USERS:

            return { ...state, users: action.users };

        default:
            return state;
    }
}

export default usersReducer
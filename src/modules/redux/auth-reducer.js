import { authApi } from "../services/api"

const LOGIN = 'LOGIN'
const REGISTRATION = 'REGISTRATION'
const LOGOUT = 'LOGOUT'

const initialState = {
    authUser: null,
    isAuth: false
}

//AC
const setAuthUser = (user, bool) => ({ type: LOGIN, user, bool })

//THUNK
export const login = (email, password) => async (dispatch) => {
    
    // try {
        await authApi.login(email, password)
        const user = await authApi.getUser()
        debugger
        if (user) {
            debugger
            console.log(user)
            dispatch(setAuthUser(user, true))
        }
    // } catch (error) {
    //     console.log(error)
    // }
}

const authReduser = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN:
            return { ...state, authUser: action.user, isAuth: action.bool }
           
        default:
            return state;
    }
}
export default authReduser
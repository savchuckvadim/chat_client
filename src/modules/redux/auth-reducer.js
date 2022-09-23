import { authApi } from "../services/api"
import { inProgress } from "./preloader-reducer"

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

    if (user) {

        dispatch(setAuthUser(user, true))
    }
    // } catch (error) {
    //     console.log(error)
    // }
}
export const me = () => async (dispatch) => {
    dispatch(inProgress(true))
    try {
        const user = await authApi.getUser()
        if (user) {
    
            dispatch(setAuthUser(user, true))
            dispatch(inProgress(false))
        }
        dispatch(inProgress(false))
    } catch (error) {
        dispatch(setAuthUser(null, false))
        dispatch(inProgress(false))
    }
  
    
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
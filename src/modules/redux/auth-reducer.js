import { authApi } from "../services/api/auth-api"
import { socket } from "../services/websocket/socket"
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
const deleteAuthUser = () => ({ type: LOGOUT })
//THUNK
export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(inProgress(true))
        await authApi.login(email, password)
        const user = await authApi.getUser()
        
        if (user) {

            dispatch(setAuthUser(user, true))
        }
    } catch (error) {
        console.log(error)
        dispatch(inProgress(false))
    }
    dispatch(inProgress(false))
}
export const me = () => async (dispatch) => {
    dispatch(inProgress(true))
    try {
        const user = await authApi.getUser()
        if (user) {

            dispatch(setAuthUser(user, true))
            await socket.connection()
            dispatch(inProgress(false))
        }
        dispatch(inProgress(false))
    } catch (error) {
        dispatch(setAuthUser(null, false))
        dispatch(inProgress(false))
    }


}
export const logout = () => async (dispatch) => {
    dispatch(inProgress(true))
    dispatch(deleteAuthUser())
    await authApi.logout()
    dispatch(inProgress(false))


}
const authReduser = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN:
            return { ...state, authUser: action.user, isAuth: action.bool }

        case LOGOUT:
            return { ...state, authUser: null, isAuth: false }

        default:
            return state;
    }
}
export default authReduser
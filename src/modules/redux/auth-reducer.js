import { authApi } from "../services/api/auth-api"
import { usersAPI } from "../services/api/users-api"
import { socket } from "../services/websocket/socket"
import { inProgress } from "./preloader-reducer"


const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const SET_REGISTRATION_STATUS = 'SET_REGISTRATION_STATUS'
const SET_NEW_USER_NAME = 'SET_NEW_USER_NAME'
const SET_SOUND = 'SET_SOUND'


const initialState = {
    authUser: null,
    isAuth: false,
    registration: {
        status: false,
        // url: ''

    }


}

//AC
const setAuthUser = (user, bool) => ({ type: LOGIN, user, bool })
const deleteAuthUser = () => ({ type: LOGOUT })
export const setRegistrationStatus = (bool) => ({ type: SET_REGISTRATION_STATUS, bool })
// export const setRegistrationUrl = (url) => ({ type: SET_REGISTRATION_URL, url })
const setNewUserName = (name) => ({ type: SET_NEW_USER_NAME, name })


//THUNK
export const registration = (name, email, password, passwordConfirmation) =>
    async (dispatch) => {
        try {
            dispatch(inProgress(true))
            await authApi.registration(name, email, password, passwordConfirmation)
            dispatch(me())

        } catch (error) {
            dispatch(inProgress(false))
        }

    }
export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(inProgress(true))
        await authApi.login(email, password)
        const user = await authApi.getUser()

        if (user) {

            dispatch(setAuthUser(user, true))
        }
    } catch (error) {
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
            await socket.reconnect(dispatch)
            // await socket.precenseListener(dispatch)
         
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

export const changeProfileName = (name) => async (dispatch) => {
    await usersAPI.updateName(name)
    dispatch(setNewUserName(name))
}
export const changePrefencesSound = (value) => (dispatch) => {

    alert(`${value}`)
}
const authReduser = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN:
            return { ...state, authUser: action.user, isAuth: action.bool }

        case LOGOUT:
            return { ...state, authUser: null, isAuth: false }

        case SET_REGISTRATION_STATUS:
            if (state.registration.status !== action.bool) {
                return {
                    ...state, registration: {
                        ...state.registration, status: action.bool
                    }
                }
            }
            return state


        // case SET_REGISTRATION_URL:
        //     if (state.registration.url !== action.url) {
        //         return {
        //             ...state, registration: {
        //                 ...state.registration, url: action.url
        //             }
        //         }
        //     }
        //     return state
        default:
            return state;
    }
}
export default authReduser
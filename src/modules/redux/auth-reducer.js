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

    }


}

//AC
const setAuthUser = (user, bool) => ({ type: LOGIN, user, bool })
const deleteAuthUser = () => ({ type: LOGOUT })
export const setRegistrationStatus = (bool) => ({ type: SET_REGISTRATION_STATUS, bool })
const setNewUserName = (name) => ({ type: SET_NEW_USER_NAME, name })
const setUserIsSound = (isSound) => ({ type: SET_SOUND, isSound })



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
        dispatch(me())
    } catch (e) {
        dispatch(inProgress(false))
        throw e
    }

}
export const me = () => async (dispatch) => {
    dispatch(inProgress(true))
    try {
        const response = await authApi.getUser()
        const user = response.resultCode === 1 ? response.user : null
        if (user) {

            dispatch(setAuthUser(user, true))
            await socket.reconnect(user.id, dispatch)
            dispatch(inProgress(false))
        }
        dispatch(inProgress(false))
    } catch (e) {

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
    dispatch(setNewUserName(name))
    await usersAPI.updateName(name)

}
export const changeSoundUser = (isSound) => async (dispatch) => {
    dispatch(setUserIsSound(isSound))
    await authApi.soundUser(isSound)
}
const authReducer = (state = initialState, action) => {

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

        case SET_SOUND:

            if (state.authUser) {
                if (state.authUser.isSound !== action.isSound) {

                    return { ...state, authUser: { ...state.authUser, isSound: action.isSound } }
                }
            }
            return state

        default:
            return state;
    }
}
export default authReducer
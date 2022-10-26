import { dialogsAPI } from "../services/api/dialogs-api"
import { socket } from "../services/websocket/socket"
import { inProgress } from "./preloader-reducer"


const SET_DIALOGS = 'dialogs/SET_DIALOGS'
const SET_CURRENT_DIALOG = 'dialogs/SET_CURRENT_DIALOG'
const CHANGE_CURRENT_DIALOG = 'dialogs/CHANGE_CURRENT_DIALOG'
const SET_NEW_MESSAGE = 'dialogs/SET_NEW_MESSAGE'

const initialState = {
    dialogs: [],
    groupDialogs:[],
    currentDialogId: undefined,
    messages: [],
    currentMessage: ''
}

//AC
const setDialogs = (dialogs) => ({ type: SET_DIALOGS, dialogs })
const setCurrentDialog = (dialogId, messages) => ({ type: SET_CURRENT_DIALOG, dialogId, messages })
export const changeCurrentDialog = (dialogId) => ({ type: CHANGE_CURRENT_DIALOG, dialogId })
export const setNewMessage = (message, authUserId) => ({ type: SET_NEW_MESSAGE, message, authUserId })

// THUNKS

export const getDialogs = (user) => async (dispatch) => {
    //TODO: dispatch(inProgress)
    const response = await dialogsAPI.getDialogs()

    dispatch(setDialogs(response.dialogs))
    await socket.subscribeToDialogs(user, response.dialogs)

}

export const sendMessage = (dialogId, body) => async (dispatch) => {
    const response = await dialogsAPI.sendMessage(dialogId, body)
    dispatch(setNewMessage(response.createdMessage))
}

export const getMessages = (dialogId) => async (dispatch) => {
    const response = await dialogsAPI.getMessages(dialogId)
    dispatch(setCurrentDialog(dialogId, response.messages))

}

//REDUCER
const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_DIALOGS:
            let lastDialogsId
            let currentMessages
            if (action.dialogs.length > 0) {
                lastDialogsId = action.dialogs[0].dialogId
                currentMessages = action.dialogs[0].dialogsMessages
            }
            return { ...state, dialogs: action.dialogs, currentDialogId: lastDialogsId, messages: currentMessages };

        case SET_CURRENT_DIALOG:
            // if (state.messages.length !== action.messages.length) {
            return { ...state, currentDialogId: action.dialogId, messages: action.messages }
        // } else {
        //     return state
        // }
        case CHANGE_CURRENT_DIALOG:
            if (state.currentDialogId !== action.dialogId) {
                const messages = state.dialogs.filter(dialog => dialog.dialogId === action.dialogId)[0].dialogsMessages


                return { ...state, currentDialogId: action.dialogId, messages: messages }
            }
        case SET_NEW_MESSAGE:
            let message = action.message
            if (message.authorId === action.authUserId) {
                message.isAuthorIsAuth = true
            } else {
                message.isAuthorIsAuth = false
            }
            const dialogs = state.dialogs.map(dialog => {
                if (dialog.dialogId === state.currentDialogId) {

                    let dialogsMessages = [...dialog.dialogsMessages]
                    const checkExistMessage = dialogsMessages.some(dialogsMessage => dialogsMessage.id === message.id)
                    if (!checkExistMessage) {
                        dialogsMessages.push(message)
                    }

                    return { ...dialog, dialogsMessages }
                } else {
                    return dialog
                }
            })
            const messages = [...state.messages, message]
            return { ...state, dialogs, messages }


        default:
            return state;
    }
}

export default dialogsReducer
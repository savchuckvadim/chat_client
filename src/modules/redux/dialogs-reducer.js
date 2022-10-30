import { dialogsAPI } from "../services/api/dialogs-api"
import { searchDialog } from "../services/utils/dialog-utils"
import { echo, socket } from "../services/websocket/socket"
import { inProgress } from "./preloader-reducer"


const SET_DIALOGS = 'dialogs/SET_DIALOGS'
const SET_CURRENT_DIALOG = 'dialogs/SET_CURRENT_DIALOG'
const CHANGE_CURRENT_DIALOG = 'dialogs/CHANGE_CURRENT_DIALOG'
const SET_NEW_MESSAGE = 'dialogs/SET_NEW_MESSAGE'
const SET_USER_IN_GROUP_DIALOG = 'dialogs/SET_USER_IN_GROUP_DIALOG'
const SET_USER_FOR_NEW_GROUP_DIALOG = 'dialogs/SET_USER_FOR_NEW_GROUP_DIALOG'
const SET_NEW_GROUP_DIALOG = 'dialogs/SET_NEW_GROUP_DIALOG'
const SET_GROUP_DIALOGS_NAME = 'dialogs/SET_GROUP_DIALOGS_NAME'



const initialState = {
    dialogs: [],
    groupDialogs: [],
    newGroupDialogsName: '',
    usersForNewGroupDialog: [],
    currentDialogId: undefined,
    currentDialog: null,
    messages: [],
    currentMessage: ''
}

//AC
const setDialogs = (dialogs, dialogIdFromUrl) => ({ type: SET_DIALOGS, dialogs, dialogIdFromUrl })
const setCurrentDialog = (dialogId, messages) => ({ type: SET_CURRENT_DIALOG, dialogId, messages })
export const changeCurrentDialog = (dialog, isGroup) => ({ type: CHANGE_CURRENT_DIALOG, dialog, isGroup })
export const setNewMessage = (message, authUserId, isGroup) => ({ type: SET_NEW_MESSAGE, message, authUserId, isGroup })
const setUsersInGroupDialog = (user, dialogId) => ({ type: SET_USER_IN_GROUP_DIALOG, user, dialogId })
export const setUserForNewGroupDialog = (user) => ({ type: SET_USER_FOR_NEW_GROUP_DIALOG, user })
const setNewGroupDialog = (groupDialog) => ({ type: SET_NEW_GROUP_DIALOG, groupDialog })
export const setGroupDialogsName = (value) => ({ type: SET_GROUP_DIALOGS_NAME, value })


// THUNKS

export const getDialogs = (dialogIdFromUrl) => async (dispatch, getState) => {
    //TODO: dispatch(inProgress)
    const response = await dialogsAPI.getDialogs()
    dispatch(setDialogs(response, dialogIdFromUrl))


    if (echo) {
        
        echo.private('new-message')

            .listen('.SendMessage', (e) => {
                let state = getState()
                if (state.auth.authUser && state.dialogs.currentDialog) {
                    let currentDialog = state.dialogs.currentDialog
                    let authUser = state.auth.authUser
                    console.log(e)
                    
                    if (currentDialog) {
                        
                        dispatch(setNewMessage(e.message, authUser.id, currentDialog.isGroup))
                    } else {
                        alert('no current dialog  ' + state.dialogs.currentDialogId)
                    }
                }
            })

    }



    // await socket.subscribeToDialogs(user, response.dialogs)

}

export const sendMessage = (dialogId, body) => async (dispatch) => {
    const response = await dialogsAPI.sendMessage(dialogId, body)
    dispatch(setNewMessage(response.createdMessage))
}

export const getMessages = (dialogId) => async (dispatch) => {
    const response = await dialogsAPI.getMessages(dialogId)
    dispatch(setCurrentDialog(dialogId, response.messages))

}

export const addNewGroupDialog = (users, dialogsName) => async (dispatch) => {
    if (users.length > 0 && dialogsName !== '') {
        const groupDialog = await dialogsAPI.addGroupDialog(users, dialogsName)
        dispatch(setNewGroupDialog(groupDialog))
    } else {
        if (users.length === 0) {
            alert('не добавлены пользователи!')
        }
        if (dialogsName === '') {
            alert('не введено имя диалога!')
        }
        else {
            alert('ошибка!')
        }

    }

}

//REDUCER
const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_DIALOGS:
            const setingDialogs = action.dialogs.dialogs
            const setingGroupDialogs = action.dialogs.groupDialogs
            
            let searchingDialogId = action.dialogs.dialogs[0].dialogId
            if(action.dialogIdFromUrl){
                searchingDialogId = action.dialogIdFromUrl
            }
            let currentDialog = searchDialog(searchingDialogId, [setingDialogs, setingGroupDialogs])
           
            let currentMessages = []
            if (currentDialog) {
                currentMessages = currentDialog.dialogsMessages
            }

            
            return {
                ...state,
                dialogs: setingDialogs,
                currentDialog,
                currentDialogId: searchingDialogId,
                messages: currentMessages,
                groupDialogs: setingGroupDialogs
            };

        case SET_CURRENT_DIALOG:
            // if (state.messages.length !== action.messages.length) {
            return { ...state, currentDialogId: action.dialog.id, currentDialog: action.dialog, messages: action.messages }
        // } else {
        //     return state
        // }
        case CHANGE_CURRENT_DIALOG:

            if (state.currentDialogId !== action.dialog.dialogId) {

                let dialogs = state.dialogs
                if (action.isGroup) {
                    dialogs = state.groupDialogs
                }

                const messages = dialogs.filter(dialog => dialog.dialogId === action.dialog.dialogId)[0].dialogsMessages


                return { ...state, currentDialogId: action.dialog.dialogId, messages: messages }
            }

        case SET_USER_FOR_NEW_GROUP_DIALOG:
            let resultUsers
            const checkUser = state.usersForNewGroupDialog.some(user => user.id === action.user.id)

            if (!checkUser) {
                resultUsers = [...state.usersForNewGroupDialog]
                resultUsers.push(action.user)
                return { ...state, usersForNewGroupDialog: resultUsers }
            }
            return state

        case SET_GROUP_DIALOGS_NAME:
            return { ...state, newGroupDialogsName: action.value }
        case SET_NEW_GROUP_DIALOG:
            const checkGroupDialog = state.groupDialogs.some(dialog => dialog.id === action.groupDialog.id)
            if (!checkGroupDialog) {
                let resultDialogs = [...state.groupDialogs]
                resultDialogs.unshift(action.groupDialog)
                return { ...state, groupDialogs: resultDialogs }
            }
            return state


        case SET_USER_IN_GROUP_DIALOG:


            let resultGroupDialogs = []
            state.groupDialogs.forEach(dialog => {
                if (dialog.dialogId === action.dialogId) {
                    let resultDialog = { ...dialog }
                    let checkUser = dialog.dialogsUsers.some(user => user.id === action.user.id)
                    if (!checkUser) {
                        resultDialog.dialogsUsers = [...dialog.dialogsUsers].push(action.user)
                    }


                    resultGroupDialogs.push(resultDialog)

                } else {
                    resultGroupDialogs.push(dialog)
                }

            });

        case SET_NEW_MESSAGE:
            let message = action.message
            if (message.authorId === action.authUserId) {
                message.isAuthorIsAuth = true
            } else {
                message.isAuthorIsAuth = false
            }
            let currentDialogs = state.dialogs
            if (action.isGroup) {
                currentDialogs = state.groupDialogs
            }
            let messages = []
            const dialogs = currentDialogs.map(dialog => {
                if (dialog.dialogId === state.currentDialogId) {

                    let dialogsMessages = [...dialog.dialogsMessages]
                    const checkExistMessage = dialogsMessages.some(dialogsMessage => dialogsMessage.id === message.id)
                    if (!checkExistMessage) {
                        dialogsMessages.push(message)
                        messages = dialogsMessages
                    }

                    return { ...dialog, dialogsMessages }
                } else {
                    return dialog
                }
            })
            
            if (!action.isGroup) {
                return { ...state, dialogs, messages }
            }
            return { ...state, groupDialogs: dialogs, messages }


        default:
            return state;
    }
}

export default dialogsReducer
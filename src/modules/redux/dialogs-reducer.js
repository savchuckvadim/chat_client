import { dialogsAPI } from "../services/api/dialogs-api"
import { searchDialog } from "../services/utils/dialog-utils"
import { echo } from "../services/websocket/socket"



const SET_DIALOGS = 'dialogs/SET_DIALOGS'
const SET_CURRENT_DIALOG = 'dialogs/SET_CURRENT_DIALOG'
const CHANGE_CURRENT_DIALOG = 'dialogs/CHANGE_CURRENT_DIALOG'
const SET_NEW_MESSAGE = 'dialogs/SET_NEW_MESSAGE'
const SET_USER_IN_GROUP_DIALOG = 'dialogs/SET_USER_IN_GROUP_DIALOG'
const PARTICIPANTS_NEW_GROUP_DIALOG = 'dialogs/PARTICIPANTS_NEW_GROUP_DIALOG'
const SET_NEW_GROUP_DIALOG = 'dialogs/SET_NEW_GROUP_DIALOG'
const SET_GROUP_DIALOGS_NAME = 'dialogs/SET_GROUP_DIALOGS_NAME'



const initialState = {
    dialogs: [],
    groupDialogs: [],

    currentDialogId: undefined,
    currentDialog: null,
    messages: [],
    currentMessage: '',

    newGroupDialog: {
        name: '',
        participants: []
    },

}

//AC
const setDialogs = (dialogs, dialogIdFromUrl) => ({ type: SET_DIALOGS, dialogs, dialogIdFromUrl })
const setCurrentDialog = (dialogId, messages) => ({ type: SET_CURRENT_DIALOG, dialogId, messages })
export const changeCurrentDialog = (dialog) => ({ type: CHANGE_CURRENT_DIALOG, dialog })
export const setNewMessage = (message, authUserId, isGroup) => ({ type: SET_NEW_MESSAGE, message, authUserId, isGroup })
const setUsersInGroupDialog = (user, dialogId) => ({ type: SET_USER_IN_GROUP_DIALOG, user, dialogId })  //for edit exist group dialog
export const participantsNewGroupDialog = (participant, bool) => ({ type: PARTICIPANTS_NEW_GROUP_DIALOG, participant, bool })
const setNewGroupDialog = (groupDialog) => ({ type: SET_NEW_GROUP_DIALOG, groupDialog })
export const setGroupDialogsName = (value) => ({ type: SET_GROUP_DIALOGS_NAME, value })


// THUNKS

export const getDialogs = (authUserId, dialogIdFromUrl) => async (dispatch, getState) => {
    //TODO: dispatch(inProgress)
    const response = await dialogsAPI.getDialogs()
    dispatch(setDialogs(response, dialogIdFromUrl))


    if (echo) {

        echo.private(`new-message.${authUserId}`)

            .listen('.SendMessage', (e) => {
                let state = getState()
                alert(e.message.body)

                if (state.auth.authUser && state.dialogs.currentDialog) {
                    let currentDialog = state.dialogs.currentDialog
                    let authUser = state.auth.authUser
                    if (currentDialog) {

                        dispatch(setNewMessage(e.message, authUser.id, currentDialog.isGroup))
                    } else {
                        alert('no current dialog  ' + state.dialogs.currentDialogId)
                    }
                }
            })
    }

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

            let searchingDialogId = action.dialogs.dialogs[0] && action.dialogs.dialogs[0].dialogId
            if (action.dialogIdFromUrl) {
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

            return { ...state, currentDialogId: action.dialog.id, currentDialog: action.dialog, messages: action.messages }

        case CHANGE_CURRENT_DIALOG:

            if (state.currentDialogId !== action.dialog.dialogId) {

                let dialogs = state.dialogs
                if (action.dialog.isGroup) {
                    dialogs = state.groupDialogs
                }

                const messages = dialogs.filter(dialog => dialog.dialogId === action.dialog.dialogId)[0].dialogsMessages


                return { ...state, currentDialogId: action.dialog.dialogId, currentDialog: action.dialog, messages: messages }
            }

            return state

        case PARTICIPANTS_NEW_GROUP_DIALOG:
            let resultUsers
            const checkParticipant = state.newGroupDialog.participants.some(p => p.id === action.participant.id)
            
            if (!checkParticipant && action.bool) {
                resultUsers = [...state.newGroupDialog.participants, action.participant]
                // resultUsers.push(action.user)
                return { ...state, newGroupDialog: { ...state.newGroupDialog, participants: resultUsers } }
            } else if (checkParticipant && !action.bool) {
                let resultParticipants = state.newGroupDialog.participants.filter(p => p.id !== action.participant.id)
                return { ...state, newGroupDialog: { ...state.newGroupDialog, participants: resultParticipants } }
            }
            
            return state

        case SET_GROUP_DIALOGS_NAME:
            return { ...state, newGroupDialog: { ...state.newGroupDialog, name: action.value } }

        case SET_NEW_GROUP_DIALOG:
            const checkGroupDialog = state.groupDialogs.some(dialog => dialog.id === action.groupDialog.id)
            if (!checkGroupDialog) {
                let resultDialogs = [...state.groupDialogs]
                resultDialogs.unshift(action.groupDialog)
                return { ...state, groupDialogs: resultDialogs }
            }
            return state


        case SET_USER_IN_GROUP_DIALOG:  //for edit exist group dialog
            let resultGroupDialogs = []
            state.groupDialogs.forEach(dialog => {
                if (dialog.dialogId === action.dialogId) {
                    const resultDialog = { ...dialog }
                    const checkUser = dialog.dialogsUsers.some(user => user.id === action.user.id)

                    if (!checkUser) {               //if user is not exist in groupDialog->users
                        resultDialog.dialogsUsers = [...dialog.dialogsUsers].push(action.user)
                    }


                    resultGroupDialogs.push(resultDialog)

                } else {
                    resultGroupDialogs.push(dialog)
                }

            });
            return { ...state, groupDialogs: resultGroupDialogs }

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
import { dialogsAPI } from "../services/api/dialogs-api"
import { searchDialog } from "../utils/dialog-utils"
import { echo } from "../services/websocket/socket"
import { addParticipantsInProgress, CANCEL } from "./group-reducer"
import { NEW_CONTACT } from "./users-reducer"
import { inProgress } from './preloader-reducer'


const SET_DIALOGS = 'dialogs/SET_DIALOGS'
const SET_DIALOG = 'dialogs/SET_DIALOG'
const SET_CURRENT_DIALOG = 'dialogs/SET_CURRENT_DIALOG'
const CHANGE_CURRENT_DIALOG = 'dialogs/CHANGE_CURRENT_DIALOG'
const SET_NEW_MESSAGE = 'dialogs/SET_NEW_MESSAGE'
const SET_SENDING_STATUS = 'dialogs/SET_SENDING_STATUS'
const PARTICIPANTS_NEW_GROUP_DIALOG = 'dialogs/PARTICIPANTS_NEW_GROUP_DIALOG'
const SET_NEW_GROUP_DIALOG = 'dialogs/SET_NEW_GROUP_DIALOG'
const SET_GROUP_DIALOGS_NAME = 'dialogs/SET_GROUP_DIALOGS_NAME'
const FORWARDING_MESSAGE = 'dialogs/FORWARDING_MESSAGE'
const FORWARD_MESSAGE = 'dialogs/FORWARD_MESSAGE'
const SET_EDITING_STATUS = 'dialogs/SET_EDITING_STATUS'
const DELETE_MESSAGE = 'dialogs/DELETE_MESSAGE'
const DELETE_DIALOG = 'dialogs/DELETE_DIALOG'
const SET_EDITING_GROUP_DIALOG = 'dialogs/SET_EDITING_GROUP_DIALOG'
const SET_EDITED_GROUP_DIALOG = 'dialogs/SET_EDITED_GROUP_DIALOG'


const initialState = {
    dialogs: [],
    groupDialogs: [],

    currentDialogId: undefined,
    currentDialog: null,
    messages: [],

    currentMessage: {
        //  isSending:  false/sending/sended/
        isSending: false
    },

    newGroupDialog: {
        dialogId: null,
        name: '',
        participants: []
    },
    forwardingMessage: {
        inProgress: false,

        body: ''
    },
    editingMessage: { //sendMessage(dialogId, body, isForwarded, isEdited)
        inProgress: false,
        id: null,
        body: ''
    }


}

//AC
const setDialogs = (dialogs, dialogIdFromUrl) => ({ type: SET_DIALOGS, dialogs, dialogIdFromUrl })
const setDialog = (dialog) => ({ type: SET_DIALOG, dialog })
const setCurrentDialog = (dialog) => ({ type: SET_CURRENT_DIALOG, dialog })
export const changeCurrentDialog = (dialog) => ({ type: CHANGE_CURRENT_DIALOG, dialog })
export const setNewMessage = (message) => ({ type: SET_NEW_MESSAGE, message })
const setSendingStatus = (status) => ({ type: SET_SENDING_STATUS, status }) //status:false, sending, sended
export const setParticipant = (participant, bool) => ({ type: PARTICIPANTS_NEW_GROUP_DIALOG, participant, bool })
const setNewGroupDialog = (groupDialog) => ({ type: SET_NEW_GROUP_DIALOG, groupDialog })
export const setGroupDialogsName = (value) => ({ type: SET_GROUP_DIALOGS_NAME, value })



//AC for context-menu

export const changeForwardingMessageStatus = (bool, messageBody) => ({ type: FORWARDING_MESSAGE, bool, messageBody })
export const setEditingStatus = (status = null, message = null) => ({ type: SET_EDITING_STATUS, status, message }) //status:false, true
const setDeleteMessage = (messageId) => ({ type: DELETE_MESSAGE, messageId })
const setDeleteDialog = (dialogId) => ({ type: DELETE_DIALOG, dialogId })
export const setEditingGroupDialog = (dialog) => ({ type: SET_EDITING_GROUP_DIALOG, dialog })  //for edit exist group dialog
// const setEditedGroupDialog = (dialog) => ({ type: SET_EDITED_GROUP_DIALOG, dialog })  //for edit exist group dialog

//DELETE_MESSAGE


// THUNKS

export const getDialogs = (authUserId, dialogIdFromUrl) => async (dispatch, getState) => {
    //TODO: dispatch(inProgress)
    const response = await dialogsAPI.getDialogs()

    dispatch(setDialogs(response, dialogIdFromUrl))


    if (echo) {

        echo.private(`new-message.${authUserId}`)

            .listen('.SendMessage', (e) => {
                let state = getState()

                if (state.auth.authUser) {
                    let authUser = state.auth.authUser
                    dispatch(setNewMessage(e.message, authUser.id))
                    alert(e.message)
                }
            })
    }

}

export const sendMessage = (dialogId, body, isForwarded, isEdited) => async (dispatch, getState) => {
    dispatch(setSendingStatus('sending'))

    const messageResponse = await dialogsAPI.sendMessage(dialogId, body, isForwarded, isEdited)

    dispatch(setSendingStatus('sended'))
    // setCurrentDialog (dialogId, messages)

    let dialogs = [
        getState().dialogs.dialogs,
        getState().dialogs.groupDialogs,
    ]
    let isDialogExistInState = searchDialog(dialogId, dialogs)
    if (!isDialogExistInState) { //если диалог, в который пересылают отсутствует в стэйте, запрашивает его на сервере и вставляет в стэйт
        const dialogResponse = await dialogsAPI.getDialog(dialogId)

        if (dialogResponse && dialogResponse.resultCode) {
            if (dialogResponse.dialog) {
                dispatch(setDialog(dialogResponse.dialog))
                // После того как новый Message вставлен во вставленный в стэйт Dialog,
                // Находим обновленный диалог из стэйта
                const dialogForCurrentDialog = searchDialog(dialogId, dialogs)
                //    и диспатчим его в стэйт в качестве CurrentDialog
                dispatch(setCurrentDialog(dialogForCurrentDialog)) //   вставляет текущий диалог

                //После того, как диалог есть в стэйте точно, вставлеят в него и в messages новое сообщение
                dispatch(setNewMessage(messageResponse.createdMessage))
            }
        }
        if (dialogResponse.resultCode === 0) { //если response getDialog вернулся без диалога - ничего не делаем выбрасываем alert
            alert(dialogResponse.message)
        }
    } else { //Если диалог в стэйте есть

        // После того как новый Message вставлен во вставленный в стэйт Dialog,
        // Находим обновленный диалог из стэйта
        const dialogForCurrentDialog = searchDialog(dialogId, dialogs)

        //    и диспатчим его в стэйт в качестве CurrentDialog
        dispatch(setCurrentDialog(dialogForCurrentDialog)) //   вставляет текущий диалог
        // вставлеят в диалог и в messages новое сообщение
        dispatch(setNewMessage(messageResponse.createdMessage))

    }
    dispatch(changeForwardingMessageStatus(false, '')) //dispatchим status чтобы убрать окно выбора диалогов(юзеров)
    dispatch(setSendingStatus(false))
}
export const sendEditMessage = (messageId, body) => async (dispatch) => {
    dispatch(setEditingStatus()) //set editing status - false and clear editing message state
    dispatch(setSendingStatus('sending'))
    const response = await dialogsAPI.editMessage(messageId, body)
    if (response.resultCode) {

        dispatch(setNewMessage(response.editedMessage))
    } else {
        alert(response.message)
    }
    // dispatch(setNewMessage(message))


    dispatch(setSendingStatus(false))
}
export const deleteMessage = (messageId) => async (dispatch) => {

    dispatch(setSendingStatus('sending'))
    await dialogsAPI.deleteMessage(messageId)
    dispatch(setDeleteMessage(messageId))
    dispatch(setSendingStatus(false))
}
export const getMessages = (dialogId) => async (dispatch) => {
    const response = await dialogsAPI.getMessages(dialogId)
    dispatch(setCurrentDialog(dialogId, response.messages))

}

export const addNewGroupDialog = (users, dialogsName, dialogId = null) => async (dispatch) => {

    if (users.length > 0 && dialogsName !== '') {
        dispatch(addParticipantsInProgress(false))
        dispatch(inProgress(true))
        const groupDialog = await dialogsAPI.addGroupDialog(users, dialogsName, dialogId)
        debugger
        if (groupDialog.createdDialog) {
            dispatch(setNewGroupDialog(groupDialog.createdDialog))
        }
        if (groupDialog.editedDialog) {
            dispatch(setNewGroupDialog(groupDialog.editedDialog))
        }
        
        dispatch(inProgress(false))
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

//for context-menu
export const deleteDialog = (dialogId) => async (dispatch) => {

    await dialogsAPI.deleteDialog(dialogId)

    dispatch(setDeleteDialog(dialogId))
    //TODO delete AC

}

//TODO sendEditGroupDialog
//REDUCER
const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        ///////////////////////////
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

        case SET_DIALOG:
            let resultDialogs = []
            let checkExistDialog = searchDialog(action.dialog.dialogId, [state.dialogs, state.groupDialogs])

            if (!checkExistDialog) {
                if (action.dialog.isGroup) {
                    resultDialogs = [...state.groupDialogs]
                    resultDialogs.unshift(action.dialog)
                    return {
                        ...state, groupDialogs: resultDialogs,
                        currentDialogId: action.dialog.dialogId, currentDialog: action.dialog, messages: action.dialog.dialogsMessages
                    }
                } else {
                    resultDialogs = [...state.dialogs]
                    resultDialogs.unshift(action.dialog)
                    return {
                        ...state, dialogs: resultDialogs,
                        currentDialogId: action.dialog.dialogId, currentDialog: action.dialog, messages: action.dialog.dialogsMessages
                    }
                }
            }
            return state


        case DELETE_DIALOG:
            let resultDeletingDialogs = []
            let resultDeletingGroupDialogs = []
            let checkExistDeletingDialog = searchDialog(action.dialogId, [state.dialogs, state.groupDialogs])

            if (checkExistDeletingDialog) {


                if (checkExistDeletingDialog.isGroup) {
                    resultDeletingDialogs = state.dialogs

                    state.groupDialogs.forEach(dialog => {
                        if (dialog.dialogId !== action.dialogId) {
                            resultDeletingGroupDialogs.push(dialog)
                        }
                    })


                } else {

                    resultDeletingGroupDialogs = state.groupDialogs
                    state.dialogs.forEach(dialog => {
                        if (dialog.dialogId !== action.dialogId) {
                            resultDeletingDialogs.push(dialog)
                        }
                    })

                }

                let resultDeletingCurrentDialogId = state.currentDialogId
                let resultDeletingCurrentDialog = state.currentDialog
                let resultDeletingCurrentMessages = state.messages

                if (state.currentDialogId === action.dialogId) {
                    let index = state.dialogs[0].dialogId !== action.dialogId ? 0 : 1
                    resultDeletingCurrentDialogId = state.dialogs[index].dialogId
                    resultDeletingCurrentDialog = state.dialogs[index]
                    resultDeletingCurrentMessages = state.dialogs[index].dialogsMessages
                }
                return {
                    ...state, dialogs: resultDeletingDialogs,
                    groupDialogs: resultDeletingGroupDialogs,
                    currentDialogId: resultDeletingCurrentDialogId,
                    currentDialog: resultDeletingCurrentDialog,
                    messages: resultDeletingCurrentMessages
                }
            }
            return state

        case SET_CURRENT_DIALOG:

            return { ...state, currentDialogId: action.dialog.dialogId, currentDialog: action.dialog, messages: action.dialog.dialogsMessages }

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
        //ERROR: id of undefined
        case SET_GROUP_DIALOGS_NAME:
            return { ...state, newGroupDialog: { ...state.newGroupDialog, name: action.value } }

        case SET_NEW_GROUP_DIALOG:
            debugger
            const checkGroupDialog = state.groupDialogs.length > 0 && state.groupDialogs.some(dialog => dialog.dialogId === action.groupDialog.dialogId)
            if (!checkGroupDialog) {
                let resultDialogs = [...state.groupDialogs]
                resultDialogs.unshift(action.groupDialog)
                return { ...state, groupDialogs: resultDialogs }
            }
            return state

        case SET_EDITING_GROUP_DIALOG:
            //action dialog
            debugger
            return {
                ...state, newGroupDialog: {
                    ...state.newGroupDialog,
                    dialogId: action.dialog.dialogId,
                    name: action.dialog.dialogName,
                    participants: action.dialog.dialogsUsers
                }
            }

        case SET_EDITED_GROUP_DIALOG:  //for edit exist group dialog
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
            //TODO isEdited
            let message = action.message
            let currentDialogs = !message.isGroup ? state.dialogs : state.groupDialogs


            if (message.isGroup && !state.groupDialogs.some(dialog => dialog.dialogId === message.dialogId) && action.message.dialogId !== state.currentDialogId) {
                return state
            } else if (!message.isGroup && !state.dialogs.some(dialog => dialog.dialogId === message.dialogId) && action.message.dialogId !== state.currentDialogId) {
                return state
            } else {

                let messages = []
                let upgradingCrrentDialog = null



                const dialogs = currentDialogs.map(dialog => {
                    if (dialog.dialogId === action.message.dialogId) {

                        let dialogsMessages = [...dialog.dialogsMessages]
                        const checkExistMessage = dialogsMessages.some(dialogsMessage => dialogsMessage.id === message.id)

                        if (!checkExistMessage && !action.message.isEdited) {
                            dialogsMessages.push(message)
                            messages = dialogsMessages
                            upgradingCrrentDialog = { ...dialog, dialogsMessages }
                        }
                        if (checkExistMessage && action.message.isEdited) {

                            dialogsMessages.forEach((m, i) => {
                                if (m.id === action.message.id) {

                                    dialogsMessages.splice(i, 1, action.message)
                                }
                            });

                            upgradingCrrentDialog = { ...dialog, dialogsMessages }
                        }

                        return { ...dialog, dialogsMessages }
                    } else {
                        return dialog
                    }
                })

                if (action.message.dialogId === state.currentDialogId) {
                    if (!action.message.isGroup) {
                        return {
                            ...state,
                            currentDialog: upgradingCrrentDialog,
                            dialogs,
                            messages
                        }
                    }
                    return {
                        ...state,
                        currentDialog: upgradingCrrentDialog,
                        groupDialogs: dialogs,
                        messages
                    }
                } else {
                    if (!action.message.isGroup) {
                        return { ...state, dialogs }
                    }
                    return { ...state, groupDialogs: dialogs }
                }

            }


        case SET_SENDING_STATUS:
            if (state.currentMessage.sendingStatus !== action.status) {
                return { ...state, currentMessage: { ...state.currentMessage, isSending: action.status } }
            }
            return state


        //context-menu
        case FORWARDING_MESSAGE:

            if (state.isMessageForwarding !== action.bool) {

                let updatingForwardingMessage = { ...state.forwardingMessage, inProgress: action.bool, body: action.messageBody }
                return { ...state, forwardingMessage: updatingForwardingMessage }
            }
            return state

        case FORWARD_MESSAGE:

            return state

        case SET_EDITING_STATUS:

            if (action.status) {
                return {
                    ...state, editingMessage: {
                        ...state.editingMessage,
                        inProgress: action.status,
                        id: action.message.id,
                        body: action.message.body,
                    }
                }
            } else {
                return {
                    ...state, editingMessage: {
                        ...state.editingMessage,
                        inProgress: false,
                        id: null,
                        body: '',
                    }
                }
            }
        case DELETE_MESSAGE:
            //action: messageId

            let resultDeleteMessageDialogs = []
            let resultDeleteMessageGroupDialogs = []
            let upgraidDialog = null
            let upgraidingMessages = []
            let allDialogs = [state.dialogs, state.groupDialogs]
            allDialogs.forEach((dialogs, i) =>
                dialogs.forEach(dialog => {
                    let isDialog = false

                    dialog.dialogsMessages.forEach((message, index) => {
                        if (message.id === action.messageId) {
                            isDialog = true
                            upgraidingMessages = [...dialog.dialogsMessages]
                            upgraidingMessages.splice(index, 1)
                            upgraidDialog = { ...dialog, dialogsMessages: upgraidingMessages }
                            // messageIndex = index

                        }
                    })
                    if (i === 0) { //!isGroup
                        !isDialog
                            ? resultDeleteMessageDialogs.push(dialog)
                            : resultDeleteMessageDialogs.push(upgraidDialog)
                    } else {
                        !isDialog
                            ? resultDeleteMessageGroupDialogs.push(dialog)
                            : resultDeleteMessageGroupDialogs.push(upgraidDialog)
                    }
                }))
            if (upgraidDialog) {
                return {
                    ...state,
                    dialogs: resultDeleteMessageDialogs,
                    groupDialog: resultDeleteMessageGroupDialogs,
                    currentDialog: upgraidDialog,
                    currentDialogId: upgraidDialog.dialogId,
                    messages: upgraidingMessages,

                }
            } else {
                return state
            }


        //users-reducer
        case NEW_CONTACT:
            // newContactId
            let isDialogsLikeUser = false

            let dialogs = state.dialogs.length > 0

                ? state.dialogs.map(dialog => {

                    dialog.dialogsUsers = dialog.dialogsUsers.map(user => {
                        isDialogsLikeUser = true

                        if (user.id === action.newContactId) {
                            return { ...user, isContacted: true }
                        } else {
                            return user
                        }

                    })
                    return { ...dialog }
                })

                : []


            let isCurrentDialogLikeUser = false

            let currentDialogUsers = state.currentDialog
                ? state.currentDialog.dialogsUsers.map(user => {
                    if (user.id === action.newContactId) {
                        isCurrentDialogLikeUser = true
                        isDialogsLikeUser = true
                        return { ...user, isContacted: true }
                    } else {
                        return user
                    }
                })
                : []

            let resultCurrentDialog = isCurrentDialogLikeUser ? { ...state.currentDialog, dialogsUsers: currentDialogUsers } : state.currentDialog
            let result = isDialogsLikeUser ? { ...state, currentDialog: resultCurrentDialog, dialogs } : state

            return result

        case CANCEL: //for cancel add new group dialog
            return { ...state, newGroupDialog: { ...state.newGroupDialog, name: '', participants: [] } }

        default:
            return state;
    }
}

export default dialogsReducer
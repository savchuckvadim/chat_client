import { dialogsAPI } from "../services/api/dialogs-api"
import { searchDialog } from "../services/utils/dialog-utils"
import { echo } from "../services/websocket/socket"
import { CANCEL } from "./group-reducer"
import { NEW_CONTACT } from "./users-reducer"

const SET_DIALOGS = 'dialogs/SET_DIALOGS'
const SET_DIALOG = 'dialogs/SET_DIALOG'
const SET_CURRENT_DIALOG = 'dialogs/SET_CURRENT_DIALOG'
const CHANGE_CURRENT_DIALOG = 'dialogs/CHANGE_CURRENT_DIALOG'
const SET_NEW_MESSAGE = 'dialogs/SET_NEW_MESSAGE'
const SET_SENDING_STATUS = 'dialogs/SET_SENDING_STATUS'
const SET_USER_IN_GROUP_DIALOG = 'dialogs/SET_USER_IN_GROUP_DIALOG'
const PARTICIPANTS_NEW_GROUP_DIALOG = 'dialogs/PARTICIPANTS_NEW_GROUP_DIALOG'
const SET_NEW_GROUP_DIALOG = 'dialogs/SET_NEW_GROUP_DIALOG'
const SET_GROUP_DIALOGS_NAME = 'dialogs/SET_GROUP_DIALOGS_NAME'
const FORWARDING_MESSAGE = 'dialogs/FORWARDING_MESSAGE'
const FORWARD_MESSAGE = 'dialogs/FORWARD_MESSAGE'



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
        name: '',
        participants: []
    },
    forwardingMessage: {
        inProgress: false,
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
const setUsersInGroupDialog = (user, dialogId) => ({ type: SET_USER_IN_GROUP_DIALOG, user, dialogId })  //for edit exist group dialog
export const setParticipant = (participant, bool) => ({ type: PARTICIPANTS_NEW_GROUP_DIALOG, participant, bool })
const setNewGroupDialog = (groupDialog) => ({ type: SET_NEW_GROUP_DIALOG, groupDialog })
export const setGroupDialogsName = (value) => ({ type: SET_GROUP_DIALOGS_NAME, value })

//AC for context-menu

export const changeForwardingMessageStatus = (bool, messageBody) => ({ type: FORWARDING_MESSAGE, bool, messageBody })
// export forwardMessage = ()


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
                }
            })
    }

}

export const sendMessage = (dialogId, body, isForwarded) => async (dispatch, getState) => {
    dispatch(setSendingStatus('sending'))

    const messageResponse = await dialogsAPI.sendMessage(dialogId, body, isForwarded)

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
            const checkGroupDialog = state.groupDialogs.some(dialog => dialog.dialogId === action.groupDialog.dialogId)
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
            let currentDialogs = !message.isGroup ? state.dialogs : state.groupDialogs
            if (message.isGroup && !state.groupDialogs.some(dialog => dialog.dialogId === message.dialogId) && action.message.dialogId !== state.currentDialogId ||
                !message.isGroup && !state.dialogs.some(dialog => dialog.dialogId === message.dialogId) && action.message.dialogId !== state.currentDialogId

            ) {
                return state
            } else {

                let messages = []
                let upgradingCrrentDialog = null



                const dialogs = currentDialogs.map(dialog => {
                    if (dialog.dialogId === action.message.dialogId) {

                        let dialogsMessages = [...dialog.dialogsMessages]
                        const checkExistMessage = dialogsMessages.some(dialogsMessage => dialogsMessage.id === message.id)
                        if (!checkExistMessage) {
                            dialogsMessages.push(message)
                            messages = dialogsMessages
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
import { dialogsAPI } from "../services/dialogs-api"
import { inProgress } from "./preloader-reducer"


const SET_DIALOGS = 'dialogs/SET_DIALOGS'
const SET_CURRENT_DIALOG = 'dialogs/SET_CURRENT_DIALOG'


const initialState = {
    dialogs: [],
    currentDialogId: [],
    messages: [],
    currentMessage: ''
}

//AC
const setDialogs = (dialogs) => ({ type: SET_DIALOGS, dialogs })
const setCurrentDialog = (dialogId, messages) => ({ type: SET_CURRENT_DIALOG, dialogId, messages })


// THUNKS

export const getDialogs = () => async (dispatch) => {
    //TODO: dispatch(inProgress)
    const response = await dialogsAPI.getDialogs()
    dispatch(setDialogs(response.dialogs))

}

export const sendMessage = (dialogId, body) => async (dispatch) => {
    const response = await dialogsAPI.sendMessage(dialogId, body)
}

export const getMessages = (dialogId) => async (dispatch) => {
    const response = await dialogsAPI.getMessages(dialogId)
    dispatch(getMessages(dialogId, response.messages))
    console.log(response)
}

//REDUCER
const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_DIALOGS:
            return { ...state, dialogs: action.dialogs };

        case SET_CURRENT_DIALOG:
            return { ...state, currentDialogId: action.dialogId, messages: action.messages };
        default:
            return state;
    }
}

export default dialogsReducer
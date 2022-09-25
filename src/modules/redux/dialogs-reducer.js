import { contactsAPI } from "../services/contacts-api"

const SET_DIALOGS = 'SET_DIALOGS'

const initialState = {
    dialogs: []
}

//AC
const setDialogs = (dialogs) => ({ type: SET_DIALOGS, dialogs })


// THUNKS

export const getDialogs = () => async (dispatch) => {
    const response = await contactsAPI.getDialogs()

    dispatch(setDialogs(response))

}

//REDUCER
const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case SET_DIALOGS:
            return { ...state, dialogs: action.dialogs };

        default:
            return state;
    }
}

export default dialogsReducer
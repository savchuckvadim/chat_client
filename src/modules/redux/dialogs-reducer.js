import { dialogsAPI } from "../services/dialogs-api"
import { inProgress } from "./preloader-reducer"


const SET_DIALOGS = 'SET_DIALOGS'

const initialState = {
    dialogs: []
}

//AC
const setDialogs = (dialogs) => ({ type: SET_DIALOGS, dialogs })


// THUNKS

export const getDialogs = () => async (dispatch) => {
    //TODO: dispatch(inProgress)
    const response = await dialogsAPI.getDialogs()

    dispatch(setDialogs(response.dialogs))

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
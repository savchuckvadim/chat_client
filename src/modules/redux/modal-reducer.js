import { FORWARDING_MESSAGE } from "./dialogs-reducer";

const MODAL_STATUS = 'MODAL_STATUS'

const initialState = {
    isActive: false,
    isMenu: false
}
//AC
export const changeModalStatus = (isActive, isMenu) => ({ type: MODAL_STATUS, isActive, isMenu })




const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_STATUS:

            return { ...state, isActive: action.isActive, isMenu:action.isMenu };

        // case FORWARDING_MESSAGE:

        //     return { ...state, isActive: action.bool };

        default:
            return state;
    }
}

export default modalReducer
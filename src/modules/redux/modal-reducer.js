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

        default:
            return state;
    }
}

export default modalReducer
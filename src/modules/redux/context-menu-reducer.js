
const CONTEXT_SWITCH = 'contextMenu/CONTEXT_IS_ACTIVE'

const initialState = {
    typeOfArea: null, //message, dialog 
    isActive: false,
    xPos: 0,
    yPos: 0,
}


//AC

export const contextMenuIsActive = (isActive, typeOfArea = null, xPos = null, yPos = null) => ({ type: CONTEXT_SWITCH, isActive, typeOfArea, xPos, yPos })


const contextMenuReducer = (state = initialState, action) => {

    switch (action.type) {
        case CONTEXT_SWITCH:
            if (action.isActive) {

                return {
                    ...state,
                    typeOfArea: action.typeOfArea,
                    isActive: action.isActive,
                    xPos: action.xPos,
                    yPos: action.yPos,
                }

            }
            return { ...state, typeOfArea: null, isActive: false, xPos: 0, yPos: 0, }






        default:
            return state;
    }
}

export default contextMenuReducer
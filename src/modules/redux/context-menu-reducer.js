
const CONTEXT_TOGGLE = 'contextMenu/CONTEXT_TOGGLE'

const initialState = {
    typeOfArea: null, //message, dialog 
    isActive: false,
    xPos: 0,
    yPos: 0,
    messageMenu: ['Forward', 'Edit', 'Delete'],
    groupDialogMenu: ['Edit', 'Delete'],
    currentMenu: []
}


//AC

export const contextMenuToggler = (
    isActive,
    typeOfArea = null,
    xPos = null,
    yPos = null
) => ({ type: CONTEXT_TOGGLE, isActive, typeOfArea, xPos, yPos })


const contextMenuReducer = (state = initialState, action) => {

    switch (action.type) {
        case CONTEXT_TOGGLE:
            let currentMenu = []
            if (action.isActive) {
                
                if (action.typeOfArea === 'message') {
                    currentMenu = [...state.messageMenu]
                } else if (action.typeOfArea === 'dialog') {
                    currentMenu = [...state.groupDialogMenu]
                }
                return {
                    ...state,
                    typeOfArea: action.typeOfArea,
                    isActive: action.isActive,
                    xPos: action.xPos,
                    yPos: action.yPos,
                    currentMenu
                }

            }
            return { ...state, typeOfArea: null, isActive: false, xPos: 0, yPos: 0, currentMenu }

        default:
            return state;
    }
}

export default contextMenuReducer
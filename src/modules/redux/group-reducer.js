const ADD_PARTICIPANTS_IN_PROGRESS = 'ADD_PARTICIPANTS_IN_PROGRESS'

export const CANCEL = 'CANCEL'

const initialState = 
{
    addingParticipantsInProgress: false,

}
export const addParticipantsInProgress = (bool) => ({ type: ADD_PARTICIPANTS_IN_PROGRESS, bool })
export const addParticipantsCancel = () => ({ type: CANCEL })

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PARTICIPANTS_IN_PROGRESS:

            return { ...state, addingParticipantsInProgress: action.bool }
        case CANCEL:
            return { ...state, addingParticipantsInProgress: false }
        default:
            return state
    }
}

export default groupReducer
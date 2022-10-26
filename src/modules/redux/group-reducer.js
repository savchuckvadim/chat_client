
const ADD_PARTICIPANTS_IN_PROGRESS = 'ADD_PARTICIPANTS_IN_PROGRESS'

const initialState = {
    addingPartisipantsInProgress: true
}
export const addPartisipantsInProgress = (bool) => ({ type: ADD_PARTICIPANTS_IN_PROGRESS, bool })

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PARTICIPANTS_IN_PROGRESS:

            return { ...state, addingPartisipantsInProgress: action.bool }

        default:
            return state
    }
}

export default groupReducer
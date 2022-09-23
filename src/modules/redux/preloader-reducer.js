
const PRELOADER = 'PRELOADER'

const initialState = {
    inProgress: true
}
//AC
export const inProgress = (bool) => ({ type: PRELOADER, bool })


const preloaderReducer = (state = initialState, action) => {

    switch (action.type) {
        case PRELOADER:

            return { ...state, inProgress: action.bool };

        default:
            return state;
    }
}

export default preloaderReducer;
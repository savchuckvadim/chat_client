const SET_CONTACTS = 'SET_CONTACTS'

const initialState = {
    contacts: []
}

//AC
const setContacts = (contacts) => ({ type: SET_CONTACTS, contacts })


// THUNKS

export const getContacts = () => async (dispatch) => {
    
}

//REDUCER
const contactsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_CONTACTS:

            break;

        default:
            break;
    }
}
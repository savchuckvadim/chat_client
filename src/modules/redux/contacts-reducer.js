import { contactsAPI } from "../services/contacts-api"

const SET_CONTACTS = 'SET_CONTACTS'

const initialState = {
    contacts: []
}

//AC
const setContacts = (contacts) => ({ type: SET_CONTACTS, contacts })


// THUNKS

export const getContacts = () => async (dispatch) => {
    const response = await contactsAPI.getContacts()

    dispatch(setContacts(response))

}

//REDUCER
const contactsReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case SET_CONTACTS:
            return { ...state, contacts: action.contacts };

        default:
            return state;
    }
}

export default contactsReducer
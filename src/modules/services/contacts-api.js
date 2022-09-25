import { api } from "./auth-api"


export const contactsAPI = {
    async getContacts(){
        const response = await api.get('contacts')

        return response.data
    }
}
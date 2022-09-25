import { api } from "./auth-api"




export const dialogsAPI = {
    async getDialogs(){
        const response = await api.get('contacts')

        return response.data
    }
}
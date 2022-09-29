import { api } from "./auth-api"




export const dialogsAPI = {
    async getDialogs() {
        const response = await api.get('dialogs')
        console.log(response.data)
        return response.data
    }
}
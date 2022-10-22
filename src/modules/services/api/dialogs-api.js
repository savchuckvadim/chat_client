
import { api } from "./api";



export const dialogsAPI = {
    async getDialogs() {
        const response = await api.get('dialogs')
        
        return response.data
    },

    async sendMessage(dialogId, body) {
        const response = await api.post('message', {
            dialogId, body
        })
       
        return response.data
    },

    async getMessages(dialogId) {
        const response = await api.get(`messages/${dialogId}`)
        return response.data
    },
    
}
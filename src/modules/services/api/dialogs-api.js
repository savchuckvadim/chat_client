
import { api } from "./api";



export const dialogsAPI = {
    async getDialogs() {
        const response = await api.get('dialogs')
        console.log(response.data)
        return response.data
    },

    async sendMessage(dialogId, body) {
        const response = await api.post('message', {
            dialogId, body
        })
        console.log(response)
        return response.data
    },

    async getMessages(dialogId) {
        const response = await api.get(`messages/${dialogId}`)
        return response.data
    }
}
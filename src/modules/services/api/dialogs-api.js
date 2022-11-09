
import { api } from "./api";



export const dialogsAPI = {
    async getDialogs() {
        const response = await api.get('dialogs')

        return response.data
    },

    async sendMessage(dialogId, body, isForwarded) {
        const response = await api.post('message', {
            dialogId, body, isForwarded
        })

        return response.data
    },

    async getMessages(dialogId) {
        const response = await api.get(`messages/${dialogId}`)
        return response.data
    },
    async addGroupDialog(users, dialogsName) {
        const response = await api.post('group-dialog', {
            users, dialogsName
        })
        if (response.resultCode === 1) {
            return response.data
        }
        else{
            alert(response.message)
        }

    }

}
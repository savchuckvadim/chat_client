
import { api } from "./api";



export const dialogsAPI = {
    async getDialogs() {
        const response = await api.get('dialogs')

        return response.data
    },
    async getDialog(dialogId) {
        const response = await api.get(`dialog/${dialogId}`)

        return response.data
    },
    //TODO isEdited
    async sendMessage(dialogId, body, isForwarded = false, isEdited = false) {
        const response = await api.post('message', {
            dialogId, body, isForwarded, isEdited
        })

        return response.data
    },

    async editMessage(messageId, body) {
        try {
            const response = await api.put('message', {
                messageId, body
            })
            
            return response.data
        } catch (error) {
            alert(error)
        }

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
        else {
            alert(response.message)
        }

    }

}
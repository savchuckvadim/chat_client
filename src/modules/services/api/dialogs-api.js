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

    async deleteMessage(messageId) {
        const response = await api.delete(`message/${messageId}`)
        return response.data
    },
    async getMessages(dialogId) {
        const response = await api.get(`messages/${dialogId}`)
        return response.data
    },
    async addGroupDialog(users, dialogsName, dialogId = null) {
        const response = await api.post('group-dialog', {
            users, dialogsName, dialogId
        })

        if (response.data.resultCode === 1) {
            return response.data
        }
        else {
            alert(response.data.message)
        }

    },

    async sound(dialogId, isSound) {
        try {
            const response = await api.put('sound-dialog', {
                dialogId, isSound
            })

            return response.data
        } catch (error) {
            alert(error.message)
        }

    },

    async deleteDialog(dialogId) {
        const response = await api.delete(`dialog/${dialogId}`)

        return response.data
    }

}
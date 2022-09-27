import { api } from "./auth-api"


export const usersAPI = {
    async getUsers(currentPage, pageSize) {
        const response = await api.get(`users?page=${currentPage}&count=${pageSize}`)
        
        return response.data.data.users
    },

    async addContact(userId){
        const response = await api.post('contact', {
            userId
        })
        return response.data
    },

    async deleteContact(userId){
        const response = await api.get(`contact/${userId}`)

        return response.data
    }

}
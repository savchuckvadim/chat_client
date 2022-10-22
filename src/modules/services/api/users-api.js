import { api } from "./api"


export const usersAPI = {
    async getUsers(currentPage, pageSize) {
        const response = await api.get(`users?page=${currentPage}&count=${1000}`)
        
        return response.data.data.users
    },

    async addContact(userId){
        const response = await api.post('contact', {
            userId
        })
        return response.data
    },

    async deleteContact(userId){
        const response = await api.delete(`contact/${userId}`)

        return response.data
    }

}
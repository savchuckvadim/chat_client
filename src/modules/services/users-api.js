import { api } from "./auth-api"


export const usersAPI = {
    async getUsers(currentPage, pageSize) {
        let response = await api.get(`users?page=${currentPage}&count=${pageSize}`)
        
        return response.data.data.users
    },

    async addContact(userId){
        let response = await api.post('contact', {
            userId
        })
        
        debugger
        return response.data
    },

    async deleteContact(userId){
        let response = await api.delete(`contact/${userId}`)

        return response.data
    }

}
import { api } from "./auth-api"


export const usersAPI = {
    async getUsers(currentPage, pageSize) {
        let response = await api.get(`users?page=${currentPage}&count=${pageSize}`)
        
        return response.data.data.users
    }
}
import { api } from "./auth-api"


export const usersAPI = {
    async getUsers(currentPage, pageSize) {
        let response = await api.get(`users?page=${currentPage}&count=${pageSize}`)
        console.log(response.data.data.users)
        debugger
        return response.data.data.users
    }
}
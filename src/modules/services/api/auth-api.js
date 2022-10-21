
import { api, instance } from "./api";



export const authApi = {
    async getUser() {
        await instance.get('sanctum/csrf-cookie')
        const response = await api.get('user')
        // await api.get('/testingevent')
        return response.data
    },

    async registration(name, email, password, passwordConfirmation) {
        await instance.get('sanctum/csrf-cookie')
        const response = await instance.post('register', {
            name, email, password,
            password_confirmation: passwordConfirmation
        })

    },
    async logout() {
        const response = await instance.post('logout', {})

    },
    async login(email, password) {
        await instance.get('sanctum/csrf-cookie')
        
        let response = await instance.post('login', {
            email, password
        })
        return response
    },
}
import axios from "axios";
import { login } from "../redux/auth-reducer";

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true
});
export const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true
});

export const authApi = {
    async getUser() {
        await instance.get('sanctum/csrf-cookie')
        const response = await api.get('user')
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
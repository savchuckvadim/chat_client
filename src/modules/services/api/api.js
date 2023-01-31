import axios from "axios"


export const instance = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: 'https://back.nmbrs-chat.store',
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true
});
export const api = axios.create({
    // baseURL: 'http://localhost:8000/api',
    baseURL: 'https://back.nmbrs-chat.store/api',
    withCredentials: true
});
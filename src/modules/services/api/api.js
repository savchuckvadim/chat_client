import axios from "axios"


export const instance = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: 'http://185.225.35.207',
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true
});
export const api = axios.create({
    // baseURL: 'http://localhost:8000/api',
    baseURL: 'http://185.225.35.207/api',
    withCredentials: true
});
import axios from "axios";

const API = axios.create({baseURL: `${import.meta.env.VITE_API_MP3}`});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if(token) req.headers.Authorization = `Bearer ${token}`;
    return req
})

export const fetchSales = () => API.get('/');
export const recordSale = (data) => API.post('/', data);
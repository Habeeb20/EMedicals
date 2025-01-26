import axios from "axios";

const API = axios.create({baseURL: `${import.meta.env.VITE_API_MP2}`})

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
})

export const fetchProducts = () => API.get('/');
console.log(fetchProducts)
export const addProduct = (data) => API.post('/', data);
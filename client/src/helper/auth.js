import axios from "axios";

const API = axios.create({baseURL: `${import.meta.env.VITE_API_MP1}`})

export const login = (data) => API.post('/login', data)
export const signup = (data) => API.post('/signup', data);
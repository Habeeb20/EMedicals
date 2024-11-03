// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/pharmacy', // Backend API base URL
});

export const fetchDrugs = () => api.get('/drugs');
export const fetchDrugDetails = (id) => api.get(`/drugs/${id}`);
export const addToCart = (drugId, quantity) => api.post(`/cart`, { drugId, quantity });
export const fetchCartItems = () => api.get('/cart');
export const checkout = (orderData) => api.post('/orders', orderData);

export default api;

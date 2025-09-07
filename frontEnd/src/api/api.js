import axios from 'axios'
const api = axios.create({
    baseURL: 'http://ecommerce-app.test/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


export default api;

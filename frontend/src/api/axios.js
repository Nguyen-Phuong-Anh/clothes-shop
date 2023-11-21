import axios from 'axios'

const axiosPrivate = axios.create({
    baseURL: 'https://clothes-shop-api.onrender.com',
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,

})

export default axiosPrivate
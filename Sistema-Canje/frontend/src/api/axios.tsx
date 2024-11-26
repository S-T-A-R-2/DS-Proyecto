import axios from 'axios'

//baseURL: 'http://localhost:5000/api',
//baseURL: 'https://ds-proyecto.onrender.com/api',
const instance = axios.create({
    baseURL: 'https://ds-proyecto.onrender.com/api',
    withCredentials: true
});

export default instance;

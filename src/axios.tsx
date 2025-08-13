import axios from 'axios'

const instance = axios({
    baseURL: "http://localhost:5173/api",
    withCredentials: true,
});

export default instance;
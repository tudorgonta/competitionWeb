import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: process.env.NODE_ENV.includes('production')
        ? process.env.REACT_APP_SERVER_URL
            ? process.env.REACT_APP_SERVER_URL
            : ''
        : 'http://localhost:3030/api/',
});


const header = () => {
    const token = Cookies.get('accessToken');
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };
}

export const verifyToken = () => API.get("/auth/verifyToken", header());

import axios from "axios";

const API = axios.create({
    baseURL: process.env.NODE_ENV.includes('production')
        ? process.env.REACT_APP_SERVER_URL
            ? process.env.REACT_APP_SERVER_URL
            : ''
        : 'http://localhost:3030/api/',
});

export const getAllCompetitions = (limit) => API.get("/competitions?limit="+limit);

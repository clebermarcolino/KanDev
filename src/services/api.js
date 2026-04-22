import axios from "axios";

const api = axios.create({
    //baseURL: "https://kandev-production-d837.up.railway.app",
    baseURL: "http://localhost:3001",
});

export default api;
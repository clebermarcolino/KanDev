import axios from "axios";

const api = axios.create({
    baseURL: "https://kandev-production-d837.up.railway.app",
});

export default api;
import axios from "axios";

const api = axios.create({
    baseURL: "https://kandev-api.onrender.com",
});

export default api;
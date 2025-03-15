import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3001", // CHANGE THIS ONCE YOU GET A DOMAIN USING VENV
})


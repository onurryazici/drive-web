import axios from "axios";

export const HTTP_REQUEST = axios.create({
    baseURL:"http://localhost:3030/api"
})
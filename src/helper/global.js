import axios from "axios";

export const HTTP_REQUEST = axios.create({
    baseURL:"http://192.168.91.130:3030/api"
})
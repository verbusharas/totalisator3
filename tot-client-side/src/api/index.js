import axios from "axios";
import store from "../store"

const HTTP = axios.create({
    baseURL:"/api"
});

HTTP.interceptors.request.use(config => {
    config.headers.authorization = store.getState().user.jwt
    return config
})

HTTP.interceptors.response.use(response => response, ({response}) => {
    if (response.status === 401 || response.status === 403) {
        window.location.href = "/user/login"
        console.log("responseeee: ", response);
    }
    console.log("responseeee: ", response);
})

export {HTTP as default}
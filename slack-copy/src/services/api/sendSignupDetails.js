import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants";

export default async function sendDetailsSignup(payload) {
   return await axios.post(API_BASE_URL + "/user/signup", payload)
    .then(function (response) {
        if (response.status === 200) {
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            return null;
        } else {
            return response;
        }
    })
    .catch( error => {
        return (error.response.data.errorMessage)
    });
} 
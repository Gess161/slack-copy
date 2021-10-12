import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants";

export default async function sendDetailsSignup(payload) {
   const res = await axios.post(API_BASE_URL + "/user", payload)
    .then(function (response) {
        if (response.status === 200) {
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
        };
    })
    .catch( error => {
        return (error.response.data.errorMessage)
    });
    return res;
} 
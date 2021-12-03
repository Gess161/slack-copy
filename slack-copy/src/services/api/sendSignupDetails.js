import axios from "axios";
import { ACCESS_TOKEN_NAME } from "../../constants";


export default async function sendDetailsSignup(payload) {
   return await axios.post(process.env.REACT_APP_API_BASE_URL + "/user/signup", payload)
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
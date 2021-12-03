import axios from "axios";
import { ACCESS_TOKEN_NAME } from "../../constants";

export default async function SendLoginDetails(payload) {
    return await axios.post(process.env.REACT_APP_API_BASE_URL + "/user/login", payload)
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                return (null);
            } else if (response.status === 204) {
                return ("Username or password does not match");
            } else {
                return ("Username does not exists");
            }
        })
        .catch(error => {
            return (error.response.data.errorMessage);
        });

};
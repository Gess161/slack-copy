import axios from "axios";
import { API_BASE_URL } from "../../constants";

export default async function uploadProfileData(payload) {
   const data = await axios.post(API_BASE_URL + "/user/upload", payload)
      .then(response => {
         if (response.status === 200) {
            return response.data;
         } else if (response.status === 204) {
            return ('You entered wrong password');
         }
      })
      .catch(error => {
         return (error.response.data.errorMessage);
      });
   return data;
}
import axios from "axios";

export default async function uploadProfileData(payload) {
   const data = await axios.post(process.env.REACT_APP_API_BASE_URL + "/user/upload", payload)
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
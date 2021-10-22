import axios from "axios";
import { API_BASE_URL } from "../../constants";

export default async function uploadProfileData(payload) {
    console.log('i worked')
   const res = await axios.post(API_BASE_URL + "/user/upload", payload)
   return res.data;
}
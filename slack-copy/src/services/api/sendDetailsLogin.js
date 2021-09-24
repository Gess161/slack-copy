import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants";
import addError from "../../redux/actions/addError";
import loginReducer from "../../redux/reducers/loginReducer/loginReducer";



export default function SendLoginDetails(payload){
    const dispatch = useDispatch()

    console.log('hi')
    axios.post(API_BASE_URL + "/user/login", payload)
    .then(response => {
        if (response.status === 200) {
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            dispatch(loginReducer(addError(null).payload))
        } else if (response.status === 204) {
            this.props.showError("Username or password does not match");
        } else {
            this.props.showError("Username does not exists")
        }
    })
    .catch(error => {
        this.props.showError(error.response.data.errorMessage)
    });
}
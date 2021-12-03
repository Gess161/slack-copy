import React from "react"
import ModalContainer from "./ModalContainer";
import uploadProfileData from "../../../services/api/uploadProfileData";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/actions/userSlice";

const Modal = (props) => {
    const dispatch = useDispatch()
    const {
        setState,
        user,
        error,
        state,
         } = props;
    const handlePasswordChange = () => {
        if (state.active) {
            setState(prevState => ({
                ...prevState,
                "active": !state.active
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                "active": !state.active,
                "password": "",
                "newPassword": "",
                "confirmPassword": ""
            }));
        }
    }
    const handleFile = (e) => {
        const file = e.target.files[0];
        setState(prevState => ({
            ...prevState,
            "image": file
        }));
    }
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    const handleSubmit = async () => {
        const formData = new FormData()
        for (let key in state) {
            formData.append(key, state[key])
        }
        const data = await uploadProfileData(formData)
        if (typeof data === "string") {
            setState(prevState => ({
                ...prevState,
                error: data
            }))
        } else {
            dispatch(setUser(data))
            setState(prevState => ({
                ...prevState,
                error: null,
                modal: !prevState.modal
            }))
        }
    }
    const handleModal = e => {
        setState(prevState => ({
            ...prevState,
            "overflow": !state.overflow
        }));
    }
    return (
        <ModalContainer
            user={user}
            error={error}
            state={state}
            handlePasswordChange={handlePasswordChange} 
            handleModal={handleModal}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleFile={handleFile}
        />
    )
}

export default Modal;
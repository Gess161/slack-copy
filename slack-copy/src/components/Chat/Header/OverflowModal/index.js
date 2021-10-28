import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "./ModalForm";
import ModalProfile from "./ModalProfile";
import uploadProfileData from "../../../../services/api/uploadProfileData";
import { userReducer } from "../../../../redux/reducers/userReducers/userSlice";

const OverflowModal = (props) => {
    const dispatch = useDispatch();
    const defaultUser = useSelector(state => state.user);
    const [error, setError] = useState(null);
    const [state, setState] = useState({
        user: defaultUser.user,
        email: defaultUser.email,
        active: false,
    })
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
            setError(data)
        } else {
            dispatch(userReducer(data))
            props.handleModal()
            setError(null)
        }
    }
    useEffect(() => {
        setState({
            user: defaultUser.user,
            email: defaultUser.email,
            previousName: defaultUser.user,
            active: false,
        })
    }, [defaultUser.user, defaultUser.email])

    const display = props.display ? "flex" : "none"
    return (
        <aside style={{ display: display }} className="modal-cover">
            <div className="modal-area">
                <div className="modal-head">
                    <h4>Edit your profile</h4>
                    <button className="buttons-close" onClick={props.handleModal}>X</button>
                </div>
                <div className="modal-container">
                    <div className="modal-content-left">
                        <ModalForm
                            handlePasswordChange={handlePasswordChange}
                            state={state}
                            handleChange={handleChange}
                            active={state.active} />
                    </div>
                    <div className="modal-content-right">
                        <ModalProfile
                            handleSubmit={handleSubmit}
                            error={error}
                            state={state}
                            handleFile={handleFile} />
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default OverflowModal;
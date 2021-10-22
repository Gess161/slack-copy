import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "./ModalForm";
import ModalProfile from "./ModalProfile";
import uploadProfileData from "../../../../services/api/uploadProfileData";
import { userReducer } from "../../../../redux/reducers/userReducers/userSlice";


const OverflowModal = (props) => {
    const dispatch = useDispatch()
    const defaultUser = useSelector(state => state.user)
    const [user, setUser] = useState(defaultUser.user)
    const [email, setEmail] = useState(defaultUser.email)
    const [file, setFile] = useState()

    useEffect(() => {
        setUser(defaultUser.user)
        setEmail(defaultUser.email)
    }, [defaultUser.user, defaultUser.email])

    const handleFile = e => {
        const file = e.target.files[0]
        setFile(file)
        console.log(file)
    }

    const handleChange = e => e.target.id === "name" ? setUser(e.target.value) : setEmail(e.target.value);

    const handleSubmit = async () => {
        const formData = new FormData()
        if (file) formData.append("image", file, file.name);
        formData.append("username", user);
        formData.append("email", email);
        formData.append("previousname", defaultUser.user)
        const data = await uploadProfileData(formData)
        console.log(data)
        dispatch(userReducer(data))
        props.handleModal()
    }

    const active = props.display ? "flex" : "none"
    return (
        <aside style={{ display: active }} className="modal-cover">
            <div className="modal-area">
                <div className="modal-head">
                    <h4>Edit your profile</h4>
                    <button className="buttons-close" onClick={props.handleModal}>X</button>
                </div>
                <div className="modal-container">
                    <div className="modal-content-left">
                        <ModalForm
                            user={user}
                            email={email}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange} />
                    </div>
                    <div className="modal-content-right">
                        <ModalProfile image={file} handleSubmit={handleSubmit} handleFile={handleFile} />
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default OverflowModal;
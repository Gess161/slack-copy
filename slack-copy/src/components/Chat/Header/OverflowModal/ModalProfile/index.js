import axios from "axios"
import React, { useState } from "react"
import { API_BASE_URL } from "../../../../../constants"

const ModalProfile = () => {
    const [file, setFile] = useState(null)

    const handleFile =  e => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file, file.name);
        axios.post(API_BASE_URL + "/user/upload", formData, {
            headers: {
                'Content-Type': `image/png`,
              }
        })
    }
    return (
        <div className="form-label form-label-modal">
            <div className="profile-header">Profile photo</div>
            <img alt="profileImage" src={file} className="profile-image"></img>
            <div className="form-button form-button-modal">
                Upload an Image
                <input accept="image/*" aria-hidden="true" onChange={handleFile} type="file" />
            </div>
            <div className="modal-buttons">
                <button className="buttons-modal">Cancel</button>
                <button className="buttons-modal buttons-modal-save">Save Changes</button>
            </div>
        </div>

    )
}
export default ModalProfile;
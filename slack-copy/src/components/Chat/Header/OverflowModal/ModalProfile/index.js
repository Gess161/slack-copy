import { useState } from "react"

const ModalProfile = () => {
    const [file, setFile] = useState(null)

    const handleFile =  e => {
        const file = e.target.files[0]
        console.log(file)
        setFile(file)
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
import React from "react"

const ModalProfile = ({ image, handleFile, handleSubmit }) => {

    return (
        <div className="form-label form-label-modal">
            <div className="profile-header">Profile photo</div>
            {image && (
                <img alt="profileImage" src={URL.createObjectURL(image)} className="profile-image" />
            )}
            <div className="form-button form-button-modal">
                Upload an Image
                <input accept="image/*" onChange={handleFile} aria-hidden="true" type="file" />
            </div>
            <div className="modal-buttons">
                <button className="buttons-modal">Cancel</button>
                <button onClick={handleSubmit} className="buttons-modal buttons-modal-save">Save Changes</button>
            </div>
        </div>

    )
}
export default ModalProfile;
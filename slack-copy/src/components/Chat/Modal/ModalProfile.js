import React from "react"

const ModalProfile = (props) => {
    const { user, error, state, handleFile, handleSubmit, handleModal } = props;
    const defaultImage = process.env.REACT_APP_API_BASE_URL + "/" + user.image;
    const chosenImage = state.image;
    const pic = chosenImage ? URL.createObjectURL(chosenImage) : defaultImage;
    
    return (
        <div className="form-label form-label-modal">
            <div className="profile-header">Profile photo</div>
            <img alt="profileImage" src={pic} className="profile-image" />
            <div className="form-button form-button-modal">
                Upload an Image
                <input accept="image/*" onChange={handleFile} aria-hidden="true" type="file" />
            </div>
            <div className="modal-buttons">
                <button onClick={handleModal}className="buttons-modal">Cancel</button>
                <button onClick={handleSubmit} className="buttons-modal buttons-modal-save">Save Changes</button>
            </div>
            <div className="alert alert-danger mt-1" style={{ display: error ? 'block' : 'none' }} role="alert">
                {error}
            </div>
        </div>

    )
}
export default ModalProfile;
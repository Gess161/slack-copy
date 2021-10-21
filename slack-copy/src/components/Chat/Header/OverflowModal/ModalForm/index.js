import React from "react"


const ModalForm = ({ handleChange, handleSubmit, user, email }) => {

    return (
        <form className="form form-modal">
            <div className="form-part form-part-modal">
                <label className="form-label form-label-modal" htmlFor="fullName">Your email</label>
                <input
                    className="form-input form-input-modal"
                    type="name"
                    id="name"
                    aria-describedby="nameHelp"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-part form-part-modal">
                <label className="form-label form-label-modal" htmlFor="displayName">Display name</label>
                <input
                    type="displayName"
                    className="form-input form-input-modal"
                    id="displayName"
                    placeholder="Username"
                    value={user}
                    onChange={handleChange}
                />
                <small id="displayHelp" className="form-small">This could be your first name, or a nickname — however you’d like people to refer to you in Hlack.</small>
            </div>
            <button
                type="button"
                className="form-button form-button-modal"
                onClick={handleSubmit}
            >
                Change password
            </button>
        </form>
    )
}
export default ModalForm;
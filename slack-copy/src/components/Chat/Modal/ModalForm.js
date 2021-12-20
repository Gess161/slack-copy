import React from "react"

const ModalForm = (props) => {
    const { handleChange, handlePasswordChange, active, state } = props;
    const display = active ? "flex" : "none"
    return (
        <form className="form form-modal">
            <div className="form-part form-part-modal">
                <label className="form-label form-label-modal" htmlFor="fullName">Your email</label>
                <input
                    className="form-input form-input-modal"
                    type="email"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    value={state.email || ""}
                    onChange={handleChange}
                />
            </div>
            <div className="form-part form-part-modal">
                <label className="form-label form-label-modal" htmlFor="displayName">Display name</label>
                <input
                    type="user"
                    className="form-input form-input-modal"
                    id="user"
                    placeholder="Username"
                    value={state.user || ""}
                    onChange={handleChange}
                />
                <small id="displayHelp" className="form-small">This could be your first name, or a nickname — however you’d like people to refer to you in Hlack.</small>
            </div>
            <button
                type="button"
                className="form-button form-button-modal"
                onClick={handlePasswordChange}
            >
                {active ? "Discard changes" : "Change password"}
            </button>
            <div className="form-part form-part-modal" style={{ display: display }}>
                <label className="form-label form-label-modal" htmlFor="displayName">Enter your password</label>
                <input
                    type="password"
                    className="form-input form-input-modal"
                    id="password"
                    placeholder="Your password"
                    onChange={handleChange}
                    value={state.password || ""}
                />
            </div>
            <div className="form-part form-part-modal" style={{ display: display }}>
                <label className="form-label form-label-modal" htmlFor="displayName">New password</label>
                <input
                    type="password"
                    className="form-input form-input-modal"
                    id="newPassword"
                    placeholder="Enter new password"
                    onChange={handleChange}
                    value={state.newPassword || ""}
                />
            </div>
            <small id="displayHelp" style={{ display: display }} className="form-small">Your password must be at least 6 characters long.</small >
            <div className="form-part form-part-modal" style={{ display: display }}>
                <label className="form-label form-label-modal" htmlFor="displayName">Confirm password</label>
                <input
                    type="password"
                    className="form-input form-input-modal"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    value={state.confirmPassword || ""}
                />
            </div>
        </form>
    )
}
export default ModalForm;
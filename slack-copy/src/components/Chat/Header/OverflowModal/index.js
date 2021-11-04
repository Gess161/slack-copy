import React from "react"
import ModalForm from "./ModalForm";
import ModalProfile from "./ModalProfile";

const OverflowModal = (props) => {
    const {
        user,
        error,
        state,
        handleModal,
        handleSubmit,
        handleChange,
        handleFile,
        handlePasswordChange } = props;
    const display = state.overflow ? "flex" : "none"
    return (
        <aside style={{ display: display }} className="modal-cover">
            <div className="modal-area">
                <div className="modal-head">
                    <h4>Edit your profile</h4>
                    <button className="buttons-close" onClick={handleModal}>X</button>
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
                            user={user}
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
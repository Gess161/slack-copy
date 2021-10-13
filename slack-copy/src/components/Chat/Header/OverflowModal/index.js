import ModalForm from "./ModalForm";
import ModalProfile from "./ModalProfile";

const OverflowModal = (props) => {
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
                        <ModalForm />
                    </div>
                    <div className="modal-content-right">
                        <ModalProfile />
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default OverflowModal;
import React, { useState, useEffect } from 'react';
import './AlertComponent.css';
import { withRouter } from "react-router"
function AlertComponent(props) {
    const [modalDisplay, toggleDisplay] = useState('none');
    const openModal = () => {
        toggleDisplay('block');
    }
    const closeModal = () => {
        toggleDisplay('none');
        props.hideError(null)
    }
    useEffect(() => {
        if (props.errorMessage !== null) {
            openModal()
        } else {
            closeModal()
        }
    });

    return (
        <div
            className={'alertMessage alert alert-danger alert-dismissable fade show'}
            role="alert"
            id="alertPopUp"
            style={{ display: modalDisplay }}
        >
            <div className="d-flex justify-content-center">
                <span>{props.errorMessage}</span>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => closeModal()}>
                </button>
            </div>
        </div>
    )
}

export default withRouter(AlertComponent)
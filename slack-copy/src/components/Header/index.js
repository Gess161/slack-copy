import React from 'react'
import {ACCESS_TOKEN_NAME} from '../../constants'

export default function Header(props) {
    function renderLogout() {
        if (props.location.pathname === '/home') {
            return (
                <div className="m1-auto">
                    <button className="btn btn-danger" onClick={handleLogout()}>Logout</button>
                </div>
            )
        }
    }
    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="row col-12  d-flex justify-content-center text-white">
                <span className="h3">Register</span>
                {renderLogout()}
            </div>
        </nav>
    )
}

// ard col-12 col-lg-4 login-card mt-2 hv-center"
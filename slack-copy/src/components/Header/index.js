import React from 'react'
import {ACCESS_TOKEN_NAME} from '../../constants'
import { withRouter } from 'react-router'

function Header(props) {
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
        <nav className="navbar display-flex col-lg-4 mt-2 bg-primary navbar-dark">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">{props.title || 'Register'}</span>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default withRouter(Header)
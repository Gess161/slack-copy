import React from 'react'
import { ACCESS_TOKEN_NAME } from '../../constants'
import { withRouter } from 'react-router'
import './Header.css'


function Header(props) {
    const capitalize = (string) => {
        if (string === '') return 'Register'
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    const title = capitalize(props.location.pathname.substring(1, props.location.pathname.length))

    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }

    let display = props.location.pathname === '/chat' ? "btn btn-danger" : "d-none"
    return (
        <nav className="nav-bar">
            <span className="nav-span">{props.title || title}</span>
            <div className="nav-logout postition-absolute btn btn-primary">
                <button className={display} onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}
export default withRouter(Header)
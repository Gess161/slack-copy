import React from 'react'
import { ACCESS_TOKEN_NAME } from '../../constants'
import { withRouter } from 'react-router'


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
        <nav className="navbar d-flex col-12 mt-2 bg-primary navbar-dark">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">{props.title || title}</span>
                <div className="m1-auto">
                    <button className={display} onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}
export default withRouter(Header)
import React from 'react';
import { ACCESS_TOKEN_NAME } from '../../constants';
import { withRouter } from 'react-router';
import './Header.css';

function Header(props) {
    const pathname = props.location.pathname;
    const capitalize = (string) => {
        if (string === '') return 'Register';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const title = capitalize(pathname.substring(1, pathname.length));
     const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        props.history.go(0);
    };

    let display = pathname === '/chat' ? "btn btn-danger" : "d-none";
    return (
        <nav className="nav-bar">
            <span className="nav-span">{props.title || title}</span>
            <div className="nav-logout postition-absolute btn btn-primary">
                <button className={display}  onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};
export default withRouter(Header)
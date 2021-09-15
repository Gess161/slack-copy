import React from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom'
import styles from "./style.module.css"


export default function NavBar() {
    return (
        <nav className={styles.nav}>
            <Navbar light expand="md">
                <NavbarBrand href="/">Hlack</NavbarBrand>
                <NavbarToggler />
                <Collapse navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink>
                                <Link className={styles.link} to='/reg'>Sign up</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link className={styles.link} to='/auth'>Log in</Link>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </nav>
    )
}
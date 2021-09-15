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


export default function NavBar() {
    return (
        <nav>
            <Navbar light expand="md">
                <NavbarBrand href="/">Hlack</NavbarBrand>
                <NavbarToggler />
                <Collapse navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink>
                                <Link to='/reg'>Sign up</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to='/auth'>Log in</Link>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </nav>
    )
}
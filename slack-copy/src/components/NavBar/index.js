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

export default function NavBar() {
    return (
        <nav>
            <Navbar light expand="md">
            <NavbarBrand href="/">Hlack</NavbarBrand>
                <NavbarToggler/>
                <Collapse  navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="">Registration</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="">Sign up</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </nav>
    )
}
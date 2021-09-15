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
import {
      BrowserRouter as Router,
      Link
  } from 'react-router-dom'
import {LinkContainter} from 'react-router-bootstrap'  

export default function NavBar() {
    return (
        <nav>
            <Router>
                <Navbar light expand="md">  
                <NavbarBrand href="/">Hlack</NavbarBrand>
                    <NavbarToggler/>
                    <Collapse  navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink as={Link} to='/reg'>Sign up</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink as={Link} to='/auth'>Log in</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Router>    
        </nav>
    )
}
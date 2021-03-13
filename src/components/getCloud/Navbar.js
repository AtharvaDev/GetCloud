import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ChangeMode from '../theme/ChangeMode'

export default function NavbarComponent() {
    return (
        <>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">
                Get Cloud
            </Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/user">
                    Profile
                </Nav.Link>
            </Nav>        <ChangeMode/>

        </Navbar>
        </>
    )
}

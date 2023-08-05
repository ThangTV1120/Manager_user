import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from "../redux/action/userAction";
function Header(props) {
    const user = useSelector(state => state.user.account)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        //Redux
        dispatch(handleLogoutRedux())
    }
    useEffect(() => {
        if (user && user.auth === false && window.location.pathname !== '/login') {
            navigate('/');
            toast.success("Logout done");
        }
    }, [user])
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <span>TVT</span>
                    <img src={logoApp} width="32" height="32" className='d-inline-block align-top' alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {(user && user.auth || window.location.pathname === '/') &&
                        <>
                            <Nav className="me-auto" >
                                <NavLink to='/' className="nav-link" >Home</NavLink>
                                <NavLink to="/user" className="nav-link" >User manager</NavLink>
                            </Nav>
                            <Nav>
                                {user && user.email && <span className='nav-link'>Welcome {user.email}</span>}
                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    {user && user.auth === true ? <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
                                        : <NavLink to='/login' className="dropdown-item" >Login</NavLink>}
                                </NavDropdown>
                            </Nav>
                        </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
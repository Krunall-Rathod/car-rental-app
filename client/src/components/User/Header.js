import React, { useEffect } from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectUser, setToken, setUser } from '../../Slice/userSlice'
import jwt_decode from "jwt-decode";

const Header = () => {

    const token = useSelector(selectToken)

    let user = useSelector(selectUser)

    useEffect(() => {
        if (token) {
            const decode = jwt_decode(token)
            dispatch(setUser(decode.user))
        }
    }, [token])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        localStorage.removeItem("token")
        dispatch(setToken(null))
        dispatch(setUser(null))
        navigate('/login')
    }


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Link className='navbar-brand' to="/">BookYourCar</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {token &&
                            <>
                                <Link className='nav-link' to="/">Home</Link>
                                <Link className='nav-link' to="/allcars">Available Cars</Link>
                                <Link className='nav-link' to="/booking/history">My History</Link>
                            </>
                        }
                        {user ? <NavDropdown title={user.username} id="basic-nav-dropdown">
                            {user.admin &&
                                <>
                                    <Link className='dropdown-item' to="/UserList">UserList</Link>
                                    <Link className='dropdown-item' to="/BookingList">BookingList</Link>
                                    <Link className='dropdown-item' to="/CarList">CarList</Link>
                                    <Link className='dropdown-item' to="/addcar">Add Car</Link>
                                </>}
                            <NavDropdown.Divider />
                            <Button onClick={logoutHandler} className='dropdown-item'>
                                Logout
                            </Button>
                        </NavDropdown> :
                            <>
                                <Link className='nav-link' to="/login">
                                    Login
                                </Link>
                                <Link className='nav-link' to="/register">
                                    Register
                                </Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header

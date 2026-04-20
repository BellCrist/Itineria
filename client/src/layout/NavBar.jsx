import { useContext, useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, useNavigate } from 'react-router-dom';
import logoImg from '../assets/Logo_Itineria_1.png';
import AccessButton from '../components/AccessButton';
import SearchBar from '../components/SearchBar';
import UserProfileButton from '../components/UserProfileButton';
import { AuthContext } from '../context/AuthContext';
import '../css/NavBar.css';

function MainNavBar() {
    const navigate = useNavigate();
    const expand = "lg";
    const [showSearch, setShowSearch] = useState(false);
    const {user, logout} = useContext(AuthContext);

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegistration = () => {
        navigate('/registration');
    }

    return (
        <>
            <Navbar expand={expand} className="bg-body-tertiary navigation-bar">
                <Container fluid className='position-relative d-flex align-items-center justify-content-between'>

                    <div className='d-flex align-items-center text-center'>
                        <div className='d-lg-none'>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        </div>
                        <Navbar.Brand href="#" className='m-0'>
                            <img
                                src={logoImg}
                                width="auto"
                                height="80"
                                className="d-inline-block align-top"
                                alt="Itineria"
                            />
                        </Navbar.Brand>
                    </div>

                    <div className='order-2 d-lg-none'>
                        <Button variant="link" className='text-dark me-2' onClick={() => setShowSearch(true)}>
                            <Search size={20} />
                        </Button>
                    </div>


                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="start"
                        style={{ backgroundColor: '#D2B48C' }}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            <div className='d-flex flex-column mx-auto'>
                                <div className="d-none d-lg-block">
                                    <SearchBar />
                                </div>
                                <Nav className="justify-content-center flex-grow-1 pe-3">
                                    <Nav.Link as={NavLink} className="nav-item" to="/">Home</Nav.Link>
                                    <Nav.Link as={NavLink} className="nav-item" to="/itinerari">I nostri itinerari</Nav.Link>
                                    <Nav.Link as={NavLink} className="nav-item" to="/about">About</Nav.Link>
                                    <Nav.Link as={NavLink} className="nav-item" to="/contatti">Contatti</Nav.Link>
                                </Nav>
                            </div>

                            <div className="gap-2 mt-3">
                                {user ? (<UserProfileButton />)
                                :
                                (<>
                                    <AccessButton label="Accedi" onClick={handleLogin} />
                                    <AccessButton label="Registrati" onClick={handleRegistration} />
                                </>)}

                            </div>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                </Container>
            </Navbar >

            {
                showSearch && (
                    <div className="p-2 bg-white d-lg-none border-bottom position-absolute w-100" style={{ zIndex: 1050 }}>
                        <div className="d-flex align-items-center">
                            <SearchBar className="flex-grow-1" />
                            <Button variant="close" className="ms-2" onClick={() => setShowSearch(false)} />
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default MainNavBar;
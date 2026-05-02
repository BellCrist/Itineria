import { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
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
    const { user, logout } = useContext(AuthContext);

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegistration = () => {
        navigate('/registration');
    }

    return (
        <>
            <Navbar expand={expand} className="bg-body-tertiary navigation-bar">
                <Container fluid>

                    <div className="row w-100 align-items-center m-0">

                        <div className="col-4 col-lg-3 d-flex align-items-center p-0">
                            <div className='d-lg-none'>
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            </div>
                            <Navbar.Brand href="#">
                                <img
                                    src={logoImg}
                                    width="auto"
                                    height="80"
                                    className="d-inline-block align-top"
                                    alt="Itineria"
                                />
                            </Navbar.Brand>
                        </div>

                        {/** Blocco centrale con searchbar e link */}
                        <div className="col-4 col-lg-6 d-flex flex-column align-items-center p-0">

                            {/* SearchBar sempre visibile nella Navbar */}
                            <div className="w-100 d-flex justify-content-center">
                                <SearchBar />
                            </div>

                            {/* Nav Links visibili SOLO in desktop (d-none d-lg-flex) */}
                            <Nav className="d-none d-lg-flex justify-content-center">
                                <Nav.Link as={NavLink} className="nav-item mx-2" to="/">Home</Nav.Link>
                                <Nav.Link as={NavLink} className="nav-item mx-2" to="/itinerari">I nostri itinerari</Nav.Link>
                                <Nav.Link as={NavLink} className="nav-item mx-2" to="/about">About</Nav.Link>
                                <Nav.Link as={NavLink} className="nav-item mx-2" to="/contatti">Contatti</Nav.Link>
                            </Nav>
                        </div>

                        <div className="col-4 col-lg-3 text-end p-0 justify-content-end">
                            {user ? (
                                <div className="d-inline-block">
                                    <UserProfileButton />
                                </div>
                            )
                                :
                                (<div className="d-none d-sm-inline-flex gap-2">
                                    <AccessButton label="Accedi" onClick={handleLogin} />
                                    <AccessButton label="Registrati" onClick={handleRegistration} />
                                </div>
                                )}
                        </div>
                    </div>



                    {/** l'offcanvas che racchiude le voci della navbar nel menu laterale */}
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
                            <div className='d-lg-none d-flex flex-column mx-auto'>
                                <Nav className="justify-content-center flex-grow-1 pe-3">
                                    <Nav.Link as={NavLink} className="nav-item" to="/">Home</Nav.Link>
                                    <Nav.Link as={NavLink} className="nav-item" to="/itinerari">I nostri itinerari</Nav.Link>
                                    <Nav.Link as={NavLink} className="nav-item" to="/about">About</Nav.Link>
                                    <Nav.Link as={NavLink} className="nav-item" to="/contatti">Contatti</Nav.Link>
                                </Nav>
                            </div>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                </Container>
            </Navbar >
        </>
    );
}
export default MainNavBar;
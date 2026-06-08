import { useContext, useState } from 'react';
import { Collapse, Nav, Navbar } from 'react-bootstrap';
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
    const { user, logout } = useContext(AuthContext);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

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

                    <div className="row w-100 align-items-center m-0 py-2 px-1 px-lg-3">

                        {/* 1. COLONNA SINISTRA: Hamburger (Mobile) / Logo (Desktop) */}
                        <div className="col-4 col-lg-3 d-flex align-items-center justify-content-start p-0">
                            {/* Toggle visibile solo su mobile */}
                            <div className='d-lg-none'>
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            </div>

                            {/* Logo Desktop: visibile solo su schermi grandi, allineato a sinistra */}
                            <Navbar.Brand href="#" className="d-none d-lg-block m-0">
                                <img
                                    src={logoImg}
                                    width="auto"
                                    height="80"
                                    className="d-inline-block align-top"
                                    alt="Itineria"
                                />
                            </Navbar.Brand>
                        </div>


                        {/* 2. COLONNA CENTRALE: Logo (Mobile) / SearchBar + NavLinks (Desktop) */}
                        <div className="col-4 col-lg-6 d-flex flex-column align-items-center justify-content-center p-0">

                            {/* Logo mobile al centro */}
                            <Navbar.Brand href="#" className="d-lg-none m-0">
                                <img
                                    src={logoImg}
                                    width="auto"
                                    height="60"
                                    className="d-inline-block align-top"
                                    alt="Itineria"
                                />
                            </Navbar.Brand>

                            {/* Blocco Desktop: SearchBar e Links visibili solo su schermi grandi */}
                            <div className="w-100 d-none d-lg-flex flex-column align-items-center">
                                <div className="w-100 d-flex justify-content-center">
                                    <SearchBar />
                                </div>
                                <Nav className="justify-content-center mt-2">
                                    <Nav.Link as={NavLink} className="nav-item mx-2" to="/">Home</Nav.Link>
                                    <Nav.Link as={NavLink} className="nav-item mx-2" to="/itinerari">I nostri itinerari</Nav.Link>
                                    <Nav.Link as={NavLink} className="nav-item mx-2" to="/about">About</Nav.Link>
                                    <Nav.Link as={NavLink} className="nav-item mx-2" to="/contatti">Contatti</Nav.Link>
                                </Nav>
                            </div>
                        </div>

                        {/* COLONNA DESTRA: Lente + Utente (Mobile) / Utente (Desktop) */}
                        <div className="col-4 col-lg-3 d-flex justify-content-end align-items-center p-0 gap-2 gap-lg-3">

                            {/* Lente d'ingrandimento, visibile solo su mobile, che può far collassare la barra di ricerca */}
                            <div className="d-flex d-lg-none">
                                <button
                                    type="button"
                                    onClick={() => setShowMobileSearch(!showMobileSearch)}
                                    aria-controls="mobile-search-collapse"
                                    aria-expanded={showMobileSearch}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'inherit',
                                        padding: '0'
                                    }}
                                    aria-label="Cerca"
                                >
                                    <Search size={24} strokeWidth={2} />
                                </button>
                            </div>

                            {/* Bottone Utente / Login: sempre visibile a destra */}
                            {user ? (
                                <div className="d-flex">
                                    <UserProfileButton />
                                </div>
                            ) : (
                                <div className="d-flex">
                                    <AccessButton onClick={handleLogin} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* TENDINA SEARCH BAR MOBILE */}
                    <div className="w-100 d-lg-none px-3">
                        <Collapse in={showMobileSearch}>
                            <div id="mobile-search-collapse">
                                <div className="py-2 w-100 d-flex justify-content-center">
                                    <SearchBar />
                                </div>
                            </div>
                        </Collapse>
                    </div>

                    {/** OFF CANVAS (Menu laterale - Invariato) */}
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="start"
                        style={{
                            backgroundColor: '#D2B48C',
                            width: '240px',
                            maxWidth: '240px'
                        }}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            <div className='d-lg-none d-flex flex-column'>
                                <Nav className="justify-content-center">
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
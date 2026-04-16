import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logoImg from '../assets/Logo_Itineria_1.png';
import '../css/NavBar.css';

function LoginNavBar() {

    return (
        <Navbar className="navigation-bar">
            {/* Il container Bootstrap per mantenere il contenuto allineato al centro della pagina */}
            <div className="container d-flex justify-content-between align-items-center py-2">

                <Navbar.Brand href="/" className='m-0'>
                    <img
                        src={logoImg}
                        width="auto"
                        height="60"
                        className="d-inline-block align-top"
                        alt="Itineria"
                    />
                </Navbar.Brand>

                <div>
                    <Nav className="justify-content-center flex-grow-1 pe-3">
                        <Nav.Link as={NavLink} className="nav-item" to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} className="nav-item" to="/itinerari">I nostri itinerari</Nav.Link>
                        <Nav.Link as={NavLink} className="nav-item" to="/about">About</Nav.Link>
                        <Nav.Link as={NavLink} className="nav-item" to="/contatti">Contatti</Nav.Link>
                    </Nav>
                </div>

            </div>
        </Navbar>
    )
}

export default LoginNavBar;
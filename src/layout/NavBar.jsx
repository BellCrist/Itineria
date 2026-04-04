
import { NavLink, useNavigate } from 'react-router-dom';
import AccessButton from '../components/AccessButton';
import '../css/NavBar.css';

function MainNavBar() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegistration = () => {
        navigate('/registration');
    }

    return (
        <nav className="NavigationBar">
            {/* Il container Bootstrap per mantenere il contenuto allineato al centro della pagina */}
            <div className="container d-flex justify-content-between align-items-center py-2">

                <h2 className="logo-text mb-0">LOGO</h2>

                <div className="nav-links">
                    <NavLink to="/" className="mx-2 nav-item">Home</NavLink>
                    <NavLink to="/itinerari" className="mx-2 nav-item">I nostri itinerari</NavLink>
                    <NavLink to="/about" className="mx-2 nav-item">About</NavLink>
                    <NavLink to="/contatti" className="mx-2 nav-item">Contatti</NavLink>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <AccessButton label="Accedi" onClick={handleLogin} />
                    <AccessButton label="Registrati" onClick={handleRegistration} />
                </div>
            </div>
        </nav>
    );
}

export default MainNavBar;
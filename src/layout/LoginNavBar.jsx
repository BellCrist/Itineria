import { NavLink } from 'react-router-dom';
import '../css/NavBar.css';

function LoginNavBar(){

    return (
        <nav className="NavigationBar">
            {/* Il container Bootstrap per mantenere il contenuto allineato al centro della pagina */}
            <div className="container d-flex justify-content-between align-items-center py-2">

                <h2 className="logo-text mb-0">LOGO</h2>

                <div className="nav-links">
                    <NavLink to="/" className="mx-2 nav-item">Home</NavLink>
                    <NavLink to="/FAQ" className="mx-2 nav-item">About</NavLink>
                    <NavLink to="/contatti" className="mx-2 nav-item">Contatti</NavLink>
                </div>

            </div>
        </nav>
    )
}

export default LoginNavBar;
import { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function UserProfileButton() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    //Chiamata all'endpoint per il logout
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                logout();
                navigate('/login');
            }
        } catch (error) {
            console.error("Errore durante la chiamata:", error);
            alert("Errore in fase di logout");
        }
    }

    //Indirizza verso la pagina di gestione del profilo
    const handleProfilePage = async (e) => {
        e.preventDefault();
        navigate('/profile');
    }

    return (
        <NavDropdown
            title={
                <span>
                    <PersonCircle size={28} className='me-2' />
                    {user.name}
                </span>
            }
            id="user-option-menu"
            align="end"
        >
            <NavDropdown.Item onClick={handleProfilePage}>
                Profile
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleProfilePage}>
                I tuoi itinerari
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>
                Logout
            </NavDropdown.Item>

        </NavDropdown>
    )
}

export default UserProfileButton;
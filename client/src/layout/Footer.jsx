import '../css/Footer.css'; // Importa lo stile qui

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-container">
            <p className="footer-text">
                © {currentYear}
                <span className="brand-name"> TRAVEL DIARY</span>.
                Tutti i diritti riservati.
            </p>
        </footer>
    );
};

export default Footer;
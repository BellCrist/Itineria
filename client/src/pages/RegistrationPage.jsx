import '../css/RegistrationPage.css';
import Footer from "../layout/Footer";
import LoginNavBar from "../layout/LoginNavBar";
import RegistrationForm from '../layout/RegistrationForm';

function RegistrationPage() {
    return (
        <>
            <div className="page-container">
                <div className="content-wrap">
                    <LoginNavBar />
                    <div className="container-fluid registration-text">
                        <h2>REGISTRATI</h2>
                    </div>
                    <RegistrationForm />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default RegistrationPage;
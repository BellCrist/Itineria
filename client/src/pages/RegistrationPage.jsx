import Footer from "../layout/Footer";
import LoginNavBar from "../layout/LoginNavBar";
import RegistrationForm from '../layout/RegistrationForm';

function RegistrationPage() {
    return (
        <>
        {/**Da sostituire la navbar */}
            <LoginNavBar />
            <div className="container-fluid registration-text">
                <h2>REGISTRATI</h2>
            </div>
            <RegistrationForm />
            <Footer/>
        </>

    )
}

export default RegistrationPage;
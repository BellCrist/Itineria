import Footer from "../layout/Footer";
import LoginInputForm from "../layout/LoginInputForm";
import LoginNavBar from "../layout/LoginNavBar";

function LoginPage() {

    return (
        <>
            <div className="page-container">
                <div className="content-wrap">
                    <LoginNavBar />
                    <div className="container-fluid login-text">
                        <h2>LOGIN</h2>
                    </div>
                    <LoginInputForm />
                </div>
                <Footer />
            </div>
        </>

    )
}

export default LoginPage;
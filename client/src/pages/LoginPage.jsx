import LoginInputForm from "../layout/LoginInputForm";
import LoginNavBar from "../layout/LoginNavBar";

function LoginPage() {

    return (
        <>
            <LoginNavBar />
            <div className="container-fluid login-text">
                <h2>LOGIN</h2>
            </div>
            <LoginInputForm />
        </>
        
    )
}

export default LoginPage;
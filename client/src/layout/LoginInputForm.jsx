import { useContext, useState } from 'react';
import { PersonFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { NavLink, useNavigate } from 'react-router-dom';
import PasswordInputComponent from '../components/PasswordInput';
import { AuthContext } from '../context/AuthContext';
import "../css/LoginInputForm.css";

function LoginInputForm() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    //Per la colorazione rossa del campo della password in caso di campo vuoto
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const isInvalidLogin = loginData.email.trim() === '' || loginData.password.trim() === '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAttemptedSubmit(true);

        if (isInvalidLogin) {
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                login(data);
                alert("Login completato!");
                navigate('/');
            } else {
                alert("Errore: " + data.message);
            }
        } catch (error) {
            console.error("Errore durante la chiamata:", error);
            alert("Il server non risponde.");
        }
    }

    return (
        <>
            <Container className="ExternalContainer">
                <Row className='justify-content-center'>
                    <Col xs={12} sm={12} md={10} lg={8} xl={7}>
                        <div className='mx-auto InputWindow'>
                            <div className='mb-3 py-5 InputContent'>
                                <Form onSubmit={handleSubmit}>
                                        <InputGroup className="mb-3 input-field-group">
                                            <InputGroup.Text id="user-icon">
                                                <PersonFill size={23} />
                                            </InputGroup.Text>

                                            <Form.Control
                                                placeholder="Email"
                                                name="email"
                                                value={loginData.email}
                                                onChange={handleChange}
                                                aria-label="Email"
                                                aria-describedby="user-icon"
                                                size='md'
                                            />
                                        </InputGroup>
                                    <PasswordInputComponent
                                        value={loginData.password}
                                        onChange={handleChange}
                                    />
                                    <Button type="submit"
                                        disabled={isInvalidLogin}
                                        className={`d-block mx-auto mt-3 px-5 rounded-pill
                                ${isInvalidLogin ? "btn-login-disabled" : "btn-login-active"}`}>LOGIN
                                    </Button>
                                </Form>
                            </div>
                            <div className='subscriptionLink'>
                                <p className='m-0'>Non hai un account?{" "}
                                    <NavLink to="/registration" className="linkSubscription">Iscriviti</NavLink>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginInputForm;
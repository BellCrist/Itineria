import { useState } from 'react';
import { PersonFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import PasswordInputComponent from '../components/PasswordInput';
import "../css/LoginInputForm.css";

function LoginInputForm() {
    const [username, setUsername] = useState("");
    const isInvalidLogin = username.trim() === '' || password.trim() === '';

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`${username} ha chiesto di eseguire il login`);
    }

    return (
        <>
            <Container className="ExternalContainer">
                I'm the external container
                <Row className='justify-content-center'>
                    <Col xs={11} sm={8} md={6} lg={6} xl={7} className='mx-auto'>
                        <div className='mx-auto InputWindow'>
                            <div className='mb-3 InputContent'>
                                <h2 className="login-title">Effettua il login</h2>
                                <Form onSubmit={handleSubmit}>
                                    <InputGroup className="mb-3 input-field-group">
                                        <InputGroup.Text id="user-icon">
                                            <PersonFill size={20} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            aria-label="Username"
                                            aria-describedby="user-icon"
                                        />
                                    </InputGroup>
                                    <PasswordInputComponent />
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
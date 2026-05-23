import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { NavLink, useNavigate } from 'react-router-dom';
import CountrySelect from '../components/CountrySelector';
import PasswordInputComponent from '../components/PasswordInput';
import { AuthContext } from '../context/AuthContext';
import '../css/RegistrationForm.css';

function RegistrationForm() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [validated, setValidated] = useState(false);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        country: '',
        city: '',
        address: '',
        province: '',
        zipCode: '',
        email: '',
        password: ''
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAttemptedSubmit(true);

        //Check sulla validità dei vari input
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                login(data);
                alert("Registrazione completata!");
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
        <Container className="ExternalContainer">
            <div className='mx-auto InputWindow'>
                <div className='mb-3 py-5 InputContent'>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} xs={6} controlId="validName">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='name'
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group as={Col} xs={6} controlId="validSurname">
                                <Form.Label>Cognome</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='surname'
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3 align-items-end">
                            <Form.Group as={Col} xs={6} controlId="validCountry">
                                <Form.Label>Nazione</Form.Label>
                                <CountrySelect
                                    value={formData.country}
                                    onChange={handleChange}
                                    name='country'
                                    showError={attemptedSubmit}
                                />
                            </Form.Group>
                            <Form.Group as={Col} xs={6} controlId="validCity">
                                <Form.Label>Città</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='city'
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} xs={6} controlId="validAddress">
                                <Form.Label>Indirizzo</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='address'
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group as={Col} xs={6} controlId="validProvince">
                                <Form.Label>Provincia</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='province'
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group as={Col} xs={6} controlId="validCap">
                                <Form.Label>CAP</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='zipCode'
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} xs={7} controlId="validEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    name='email'
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Inserire un indirizzo mail valido
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group as={Col} xs={7} controlId="validPassword">
                                <Form.Label>Password</Form.Label>
                                <PasswordInputComponent
                                    value={formData.password}
                                    onChange={handleChange}
                                    required={true}
                                    showError={attemptedSubmit}
                                />
                            </Form.Group>
                        </Row>

                        <Button variant="primary" type="submit">
                            Iscriviti
                        </Button>
                    </Form>
                </div>
                <div className='subscriptionLink'>
                    <p className='m-0'>Hai già un account?{" "}
                        <NavLink to="/login" className="linkSubscription">Accedi</NavLink>
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default RegistrationForm;
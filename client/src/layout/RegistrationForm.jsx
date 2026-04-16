import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CountrySelect from '../components/CountrySelector';
import PasswordInputComponent from '../components/PasswordInput';
import '../css/RegistrationForm.css';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        nazione: '',
        città: '',
        indirizzo: '',
        provincia: '',
        cap: '',
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

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registrazione completata: " + data.message);
            } else {
                alert("Errore: " + data.message);
            }
        } catch (error) {
            console.error("Errore durante la chiamata:", error);
            alert("Il server non risponde.");
        }
    }

    return (
        <Container className="Form-container">
            <div className='mx-auto registrationForm'>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col xs={5}>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                            type='text'
                            name='nome'
                            onChange={handleChange}
                            />
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control
                            type='text'
                            name='cognome'
                            onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3 align-items-end">
                        <Col xs={5}>
                            <CountrySelect
                                value={formData.nazione}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Città</Form.Label>
                            <Form.Control
                            type='text'
                            name='città'
                            onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={5}>
                            <Form.Label>Indirizzo</Form.Label>
                            <Form.Control
                            type='text'
                            name='indirizzo'
                            onChange={handleChange}
                            />
                        </Col>
                        <Col xs={3}>
                            <Form.Label>Provincia</Form.Label>
                            <Form.Control
                            type='text'
                            name='provincia'
                            onChange={handleChange}
                            />
                        </Col>
                        <Col xs={3}>
                            <Form.Label>CAP</Form.Label>
                            <Form.Control
                            type='text'
                            name='cap'
                            onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={6}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                            type='email'
                            name='email'
                            onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col xs={6}>
                            <Form.Label>Password</Form.Label>
                            <PasswordInputComponent
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit">
                        Iscriviti
                    </Button>
                </Form>
            </div>
        </Container>
    )
}

export default RegistrationForm;
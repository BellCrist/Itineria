import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CountrySelect from '../components/CountrySelector';
import PasswordInputComponent from '../components/PasswordInput';
import '../css/RegistrationForm.css';

function RegistrationForm() {
    return (
        <Container className="Form-container">
            <div className='mx-auto registrationForm'>
                <Form>
                    <Row className="mb-3">
                        <Col xs={5}>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type='text' />
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control type='text' />
                        </Col>
                    </Row>

                    <Row className="mb-3 align-items-end">
                        <Col xs={5}>
                            <CountrySelect />
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Città</Form.Label>
                            <Form.Control type='text' />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={5}>
                            <Form.Label>Indirizzo</Form.Label>
                            <Form.Control type='text' />
                        </Col>
                        <Col xs={3}>
                            <Form.Label>Provincia</Form.Label>
                            <Form.Control type='text' />
                        </Col>
                        <Col xs={3}>
                            <Form.Label>CAP</Form.Label>
                            <Form.Control type='text' />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={6}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col xs={6}>
                            <Form.Label>Password</Form.Label>
                            <PasswordInputComponent />
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
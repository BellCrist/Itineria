import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
function UserDataManager() {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        country: '',
        city: '',
        address: '',
        province: '',
        zipCode: '',
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/user-profile/save-data', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data);
                alert("Dati salvati con successo!");
            } else {
                alert("Errore: " + data.message);
            }
        } catch (error) {
            console.error("Errore durante la chiamata:", error);
            alert("Il server non risponde.");
        }
    }


    useEffect(() => {

        const getUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user-profile/informations', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.info);
                }

            } catch (error) {
                console.error("Errore recupero dati utente");
            }
        };

        getUserData();

    }, []);


    return (
        <>
            <Container className="Form-container">
                <div className='mx-auto registrationForm'>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col xs={5}>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='name'
                                    onChange={handleChange}
                                    value={userData.name}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={5}>
                                <Form.Label>Cognome</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='surname'
                                    onChange={handleChange}
                                    value={userData.surname}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={5}>
                                <Form.Label>Paese</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='country'
                                    onChange={handleChange}
                                    value={userData.country}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={5}>
                                <Form.Label>Città</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='city'
                                    onChange={handleChange}
                                    value={userData.city}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={5}>
                                <Form.Label>Indirizzo</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='address'
                                    onChange={handleChange}
                                    value={userData.address}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={5}>
                                <Form.Label>CAP</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='zipCode'
                                    onChange={handleChange}
                                    value={userData.zipCode}
                                />
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit">
                            SALVA
                        </Button>
                    </Form>
                </div>
            </Container>
        </>

    )
}

export default UserDataManager;
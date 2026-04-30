import { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NewItineraryForm() {

    const navigate = useNavigate();
    const [tripName, setTripName] = useState('');
    const [tripDescription, setTripDescription] = useState('');
    const [waypoints, setWaypoints] = useState([
        { destination: '', date: '', time: '', notes: '' } // Partiamo con una tappa vuota
    ]);
    const [privateItinerary, setPrivateItinerary] = useState(false);

    // 2. Funzione per aggiungere un nuovo waypoint all'array
    const addWaypoint = () => {
        setWaypoints([...waypoints, { destination: '', date: '', time: '', notes: '' }]);
    };

    // 3. Funzione per rimuovere un waypoint
    const removeWaypoint = (index) => {
        const newWaypoints = [...waypoints];
        newWaypoints.splice(index, 1);
        setWaypoints(newWaypoints);
    };

    // 4. Funzione per aggiornare i valori di un singolo waypoint
    const handleWaypointChange = (index, field, value) => {
        const newWaypoints = [...waypoints];
        newWaypoints[index][field] = value;
        setWaypoints(newWaypoints);
    };

    // 5. Gestione del submit finale
    const handleSubmit = async (e) => {
        e.preventDefault();
        const itineraryData = {
            tripName,
            tripDescription,
            waypoints,
            privateItinerary
        };

        try {
            const response = await fetch('http://localhost:8080/api/user-itinerary/new-itinerary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itineraryData),
                credentials: 'include'
            });

            if (response.ok) {
                alert("Itinerario salvato con successo!");
                navigate('/personal-itinerary');
            } else {
                alert("Errore nel salvataggio dell'itinerario");
            }

        } catch (error) {
            console.error("Errore durante la chiamata:", error);
            alert("Il server non risponde.");
        }
    };

    return (
        <Container className="Form-container">
            <h2>Crea il tuo Itinerario</h2>
            <div className='mx-auto'>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Label>Nome del Viaggio</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Es. Tour dell'Andalusia"
                            value={tripName}
                            onChange={(e) => setTripName(e.target.value)}
                            required
                        />
                    </Row>

                    <Row className="mb-3">
                        <Col xs={5}>
                            <Form.Label>Descrizione Itinerario</Form.Label>
                            <Form.Control
                                as='textarea'
                                name='surname'
                                onChange={(e) => setTripDescription(e.target.value)}
                                value={tripDescription}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <h4>Tappe del Viaggio (Waypoints)</h4>

                    {waypoints.map((waypoint, index) => (
                        <Card className="mb-3" key={index}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <Card.Title className="mb-0">Tappa #{index + 1}</Card.Title>
                                    {waypoints.length > 1 && (
                                        <Button variant="outline-danger" size="sm" onClick={() => removeWaypoint(index)}>
                                            Rimuovi
                                        </Button>
                                    )}
                                </div>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Destinazione</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Città, Hotel, Attrazione..."
                                                value={waypoint.destination}
                                                onChange={(e) => handleWaypointChange(index, 'destination', e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Data</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={waypoint.date}
                                                onChange={(e) => handleWaypointChange(index, 'date', e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Ora</Form.Label>
                                            <Form.Control
                                                type="time"
                                                value={waypoint.time}
                                                onChange={(e) => handleWaypointChange(index, 'time', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group>
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        placeholder="Dettagli sui trasporti, prenotazioni, ecc."
                                        value={waypoint.notes}
                                        onChange={(e) => handleWaypointChange(index, 'notes', e.target.value)}
                                    />
                                </Form.Group>

                            </Card.Body>
                        </Card>
                    ))}

                    <Button variant="secondary" onClick={addWaypoint} className="mb-4">
                        + Aggiungi un'altra tappa
                    </Button>

                    <div className='mb-3'>
                        <Form.Check
                            type="checkbox"
                            label="Itinerario privato"
                            checked={privateItinerary}
                            onChange={(e) => setPrivateItinerary(e.target.checked)}
                        />
                    </div>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Salva Itinerario
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default NewItineraryForm;
import { useState } from 'react';
import { Button, Card, Col, Container, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CancelChanges from '../components/CancelChanges';
import SaveChangesButton from '../components/SaveChangesButton';
import '../css/NewItineraryForm.css';

function NewItineraryForm() {

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
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

        //Controlli sulla validità dei vari campi del form
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        setValidated(true);

        const itineraryData = {
            tripName,
            tripDescription,
            waypoints,
            privateItinerary
        };

        try {
            const response = await fetch('/api/itineraries/new-itinerary', {
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
        <Container className="itinerary-form-container">
            <div className='mx-auto py-3 px-3 mx-auto'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className='mb-3'>
                        <Form.Group as={Col} xs={6} controlId="validName">
                            <Form.Label><strong>Nome itinerario</strong></Form.Label>
                            <Form.Control
                                type="text"
                                value={tripName}
                                onChange={(e) => setTripName(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Nome itinerario obbligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={7}>
                            <Form.Label><strong>Descrizione itinerario</strong></Form.Label>
                            <Form.Control
                                as='textarea'
                                name='surname'
                                onChange={(e) => setTripDescription(e.target.value)}
                                value={tripDescription}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <h4>Tappe del Viaggio</h4>

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

                    <Button variant="success" onClick={addWaypoint} className="mb-4">
                        + Aggiungi un'altra tappa
                    </Button>

                    <div className='mb-3'>
                        <OverlayTrigger
                            key={'private-itinerary'}
                            placement='bottom'
                            overlay={
                                <Tooltip>
                                    Rende il tuo itinerario privato, non visibile agli altri utenti
                                </Tooltip>
                            }
                        >
                            <Form.Check
                                type="checkbox"
                                label="Itinerario privato"
                                checked={privateItinerary}
                                onChange={(e) => setPrivateItinerary(e.target.checked)}
                            />
                        </OverlayTrigger>
                    </div>

                    <div className="d-flex justify-content-end">
                        <SaveChangesButton hasChanges={true} />
                        <CancelChanges />
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default NewItineraryForm;
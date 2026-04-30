import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function ItineraryDetails({ id }) {

    const [itineraryDetails, setItineraryDetails] = useState({
        title: '',
        description: '',
        waypoints: [],
        details: '',
        shareable: ''
    });

    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        const loadItineraryDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/user-itinerary/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setItineraryDetails({
                        ...data,
                        waypoints: data.waypoints || []
                    });
                }
            } catch (error) {
                console.error('Errore caricamento dettagli itinerario:', error);
                setItineraryDetails(null);
            }
        }

        if (id) {
            loadItineraryDetail();
        }
    }, [id]);


    //Gestisce la modifica di ogni campo dell'itinerario
    const handleChange = (e) => {
        setItineraryDetails({
            ...itineraryDetails,
            [e.target.name]: e.target.value
        });
    };

    //Gestisce la modifica di ogni campo di ogni singola waypoint
    const handleWaypointChange = (index, field, value) => {
        const updatedWaypoints = [...itineraryDetails.waypoints];
        updatedWaypoints[index] = {
            ...updatedWaypoints[index],
            [field]: value
        };
        setItineraryDetails({
            ...itineraryDetails,
            waypoints: updatedWaypoints
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updateData = {
                tripName: itineraryDetails.title,
                tripDescription: itineraryDetails.description,
                waypoints: itineraryDetails.waypoints,
                privateItinerary: itineraryDetails.shareable
            };

            const response = await fetch(`http://localhost:8080/api/user-itinerary/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Itinerario aggiornato con successo!');
            } else {
                const error = await response.json();
                alert('Errore: ' + error.message);
            }
        } catch (error) {
            console.error('Errore aggiornamento itinerario:', error);
            alert('Errore interno del server');
        }
    }

    /** Impostando l'oggetto a null disabilita l'edit del campo */
    const handleBlur = async (e) => {
        setEditingField(null);
    }

    return (
        <div className="container my-4">
            <h1>Dettaglio itinerario</h1>
            <Container>
                <div className='mx-auto registrationForm'>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col xs={10}>
                                <div className="d-flex align-items-center">
                                    {editingField === 'title' ? (<>
                                        <Form.Label>Titolo itinerario</Form.Label>
                                        <Form.Control
                                            key='input-titolo'
                                            type='text'
                                            name='title'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoFocus
                                            value={itineraryDetails.title}
                                        />
                                    </>)
                                        :
                                        (
                                            <>
                                                <span className="fs-5 me-2 py-1">{itineraryDetails.title}</span>
                                                <i
                                                    className="bi bi-pencil text-primary"
                                                    style={{ cursor: 'pointer', fontSize: '1rem' }}
                                                    onClick={() => setEditingField('title')}
                                                />
                                            </>
                                        )
                                    }

                                </div>

                            </Col>
                        </Row>

                        {/** Blocco descrizione itinerario */}
                        <Row className="mb-3">
                            <Col xs={10}>
                                <div className="d-flex align-items-center">
                                    {editingField === 'description' ? (<>
                                        <Form.Label>Descrizione itinerario</Form.Label>
                                        <Form.Control
                                            key='input-descrizione'
                                            type='text'
                                            name='description'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoFocus
                                            value={itineraryDetails.description}
                                        />
                                    </>)
                                        :
                                        (
                                            <>
                                                <span className="fs-5 me-2 py-1">{itineraryDetails.description}</span>
                                                <i
                                                    className="bi bi-pencil text-primary"
                                                    style={{ cursor: 'pointer', fontSize: '1rem' }}
                                                    onClick={() => setEditingField('description')}
                                                />
                                            </>
                                        )
                                    }

                                </div>

                            </Col>
                        </Row>

                        {/** Blocco waypoints dell'itinerario */}
                        <Row className='mb-3'>
                            <Col xs={12} md={10} lg={8}>
                                <Form.Label className='text-muted small'>Waypoints</Form.Label>
                                {itineraryDetails && itineraryDetails.waypoints && itineraryDetails.waypoints.length > 0
                                    ?
                                    (
                                        <ol className='ps-3'>
                                            {
                                                itineraryDetails.waypoints.map((waypoint, index) => (
                                                    <li key={index} className='mb-2'>
                                                        {editingField === `waypoint-${index}` ? (
                                                            <div key={index} className='single-waypoint-container'>
                                                                <div className='d-flex align-items-center mb-2 date-time-container'>
                                                                    <Form.Control
                                                                        type='date'
                                                                        value={waypoint.date || ''}
                                                                        onChange={(e) => handleWaypointChange(index, 'date', e.target.value)}
                                                                        autoFocus
                                                                        className='me-2'
                                                                    />
                                                                    <Form.Control
                                                                        type='time'
                                                                        value={waypoint.time || ''}
                                                                        className='me-2'
                                                                        onChange={(e) => handleWaypointChange(index, 'date', e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className='details-container'>
                                                                    <Form.Control
                                                                        type='text'
                                                                        value={waypoint.destination || ''}
                                                                        className='me-2'
                                                                        onChange={(e) => handleWaypointChange(index, 'destination', e.target.value)}
                                                                    />
                                                                    <i
                                                                        className="bi bi-floppy-fill text-success fs-5 ms-1"
                                                                        style={{ cursor: 'pointer' }}
                                                                        onClick={() => setEditingField(null)}
                                                                        title="Salva tappa"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ) :
                                                            (
                                                                /* --- MODALITÀ VISUALIZZAZIONE --- */
                                                                <div className='single-waypoint-container d-flex justify-content-between align-items-center py-2 border-bottom'>
                                                                    <div className="flex-grow-1">
                                                                        <div className='text-muted small mb-1'>
                                                                            <span className="me-3">
                                                                                <strong>Data:</strong> {waypoint.date || '-'}
                                                                            </span>
                                                                            <span>
                                                                                <strong>Ora:</strong> {waypoint.time || '-'}
                                                                            </span>
                                                                        </div>
                                                                        <div className='fs-5'>
                                                                            {waypoint.destination || 'Nessuna destinazione'}
                                                                        </div>
                                                                    </div>

                                                                    {/* Icona per APRIRE la modifica di questo blocco */}
                                                                    <i
                                                                        className="bi bi-pencil text-primary ms-3"
                                                                        style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                                                                        onClick={() => setEditingField(`waypoint-${index}`)}
                                                                        title="Modifica tappa"
                                                                    />
                                                                </div>
                                                            )
                                                        }
                                                    </li>

                                                ))
                                            }
                                        </ol>

                                    ) : (
                                        <p className='text-muted'>Nessun waypoint disponibile</p>
                                    )}
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit" size="lg">
                            Salva modifiche
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    )
}

export default ItineraryDetails;
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function ItineraryDetails({ id }) {

    const navigate = useNavigate();
    const [itineraryDetails, setItineraryDetails] = useState({
        title: '',
        description: '',
        waypoints: [],
        details: '',
        shareable: ''
    });

    const [originalDetails, setOriginalDetails] = useState({
        title: '',
        description: '',
        waypoints: [],
        details: '',
        shareable: ''
    });

    const [editingField, setEditingField] = useState(null);
    const hasChanges = JSON.stringify(itineraryDetails) !== JSON.stringify(originalDetails);

    useEffect(() => {
        const loadItineraryDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/user-itinerary/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setItineraryDetails(data);
                    setOriginalDetails(data);
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
        setItineraryDetails((prevDetails) => {

            // 1. Copiamo l'array usando l'ultimissimo stato garantito (prevDetails)
            const updatedWaypoints = [...prevDetails.waypoints];

            // 2. Aggiorniamo l'elemento specifico
            updatedWaypoints[index] = {
                ...updatedWaypoints[index],
                [field]: value
            };

            // 3. Ritorniamo il nuovo oggetto completo
            return {
                ...prevDetails,
                waypoints: updatedWaypoints
            };
        });
    };

    //Gestisce l'aggiunta di una nuova tappa nell'itinerario
    const handleAddWaypoint = () => {
        setItineraryDetails((prevDetails) => {
            const newWaypoint = { date: '', time: '', destination: '' };
            const updatedWaypoints = [...prevDetails.waypoints, newWaypoint];

            return {
                ...prevDetails,
                waypoints: updatedWaypoints
            };
        });
    };

    /**Gestisce la cancellazione di un waypoint */
    const handleDeleteWaypoint = async (indexToDelete) => {
        if (window.confirm('Sei sicuro di voler eliminare questa tappa?')) {
            const updatedWaypoints = itineraryDetails.waypoints.filter((_, index) => index != indexToDelete);
            setItineraryDetails({
                ...itineraryDetails,
                waypoints: updatedWaypoints
            });
        }
    }


    /** Impostando l'oggetto a null disabilita l'edit del campo */
    const handleBlur = async (e) => {
        setEditingField(null);
    }

    /** Cliccando fuori dal div di un singolo waypoint attiva la modalità visualizzazione */
    const waypointHandleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setEditingField(null);
        }
    };

    //Gestore della cancellazione di un itinerario
    const handleDeleteItinerary = async () => {
        const isConfirmed = window.confirm("Sei sicuro di voler eliminare l'intero itinerario?");

        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8080/api/user-itinerary/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });

                if (response.ok) {
                    alert("Itinerario eliminato con successo");
                    navigate('/personal-itinerary');
                }
            } catch (error) {
                console.error("Errore durante l'eliminazione dell'itinerario", error);
            }
        }
    }

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

    return (
        <div className="container my-4">
            <h1>Dettaglio itinerario</h1>
            <Container className='bg-white rounded-5 shadow p-4 position-relative'>
                <Button
                    variant="danger"
                    className="position-absolute top-0 end-0 mt-3 me-3"
                    onClick={handleDeleteItinerary}
                    title="Elimina Itinerario"
                >
                    <i className="bi bi-trash3-fill"></i>
                    <span className="d-none d-md-inline ms-2">Elimina</span>
                </Button>

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
                                                <h1 className="me-3 py-1">{itineraryDetails.title}</h1>
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
                                    {editingField === 'description' ?
                                        (<>
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
                                                            <div
                                                                key={index}
                                                                className='single-waypoint-container'
                                                                onBlur={waypointHandleBlur}
                                                            >
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
                                                                        onChange={(e) => handleWaypointChange(index, 'time', e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className='details-container mb-2'>
                                                                    <Form.Control
                                                                        type='text'
                                                                        value={waypoint.destination || ''}
                                                                        className='me-2'
                                                                        onChange={(e) => handleWaypointChange(index, 'destination', e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className='note-container mb-2'>
                                                                    <Form.Label>Note</Form.Label>
                                                                    <Form.Control
                                                                        type='text'
                                                                        value={waypoint.details || ''}
                                                                        className='me-2'
                                                                        onChange={(e) => handleWaypointChange(index, 'details', e.target.value)}
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
                                                                        <div className='fs-5 mb-1'>
                                                                            {waypoint.destination || 'Nessuna destinazione'}
                                                                        </div>
                                                                        <div className='fs-7 mb-1'>
                                                                            {waypoint.details}
                                                                        </div>
                                                                    </div>

                                                                    {/* Icona per APRIRE la modifica di questo blocco */}
                                                                    <div className='d-flex align-items-center'>
                                                                        <i
                                                                            className="bi bi-pencil text-primary ms-3"
                                                                            style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                                                                            onClick={() => setEditingField(`waypoint-${index}`)}
                                                                            title="Modifica tappa"
                                                                        />
                                                                        <i
                                                                            className="bi bi-trash text-danger"
                                                                            style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                                                                            onClick={() => handleDeleteWaypoint(index)}
                                                                        />
                                                                    </div>
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

                        <Button variant="success" className="mb-4" onClick={handleAddWaypoint}>
                            + Aggiungi un'altra tappa
                        </Button>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg" disabled={!hasChanges}>
                                Salva modifiche
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </div>
    )
}

export default ItineraryDetails;
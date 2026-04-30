import { useEffect, useState } from "react";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreateItineraryButton from '../components/CreateItineraryButton';
import '../css/ItineraryList.css';

function Itinerarylist() {
    const [listaItinerari, setListaItinerari] = useState(null);

    useEffect(() => {
        const getUserItinerary = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user-itinerary/itinerary-list', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setListaItinerari(Array.isArray(data) ? data : []);
                } else {
                    setListaItinerari([]);
                }
            } catch (error) {
                console.error('Errore durante il fetch degli itinerari:', error);
                setListaItinerari([]);
            }
        }
        getUserItinerary();
    }, []);


    return (
        <div className="mx-3 my-3 itinerary-list-content">
                {listaItinerari === null ? (
                    <h3>Caricamento itinerari...</h3>
                ) : listaItinerari.length === 0 ? (
                    <h3>Lista vuota</h3>
                ) : (
                    <div className="row g-3">
                        {listaItinerari.map((itinerario) => (
                            <div key={itinerario.id} className="col-12 col-md-4">
                                <Card
                                    as={Link}
                                    to={`/personal-itinerary/${itinerario.id}`}
                                    className="h-100 shadow-sm text-reset text-decoration-none position-relative itinerary-card"
                                >
                                    <div className="itinerary-card-hover badge bg-primary text-white">
                                        Visualizza
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{itinerario.title}</Card.Title>
                                        <Card.Text>
                                            {itinerario.description || 'Nessuna descrizione disponibile.'}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-4">
                    <CreateItineraryButton />
                </div>
            </div>
    )
}

export default Itinerarylist;
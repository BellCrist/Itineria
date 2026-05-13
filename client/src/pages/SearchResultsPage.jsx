import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../css/ItineraryList.css';
import MainNavBar from '../layout/NavBar';

function SearchResultsPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const destination = searchParams.get('destination') || '';

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!destination) {
            setLoading(false);
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8080/api/itineraries/search?destination=${encodeURIComponent(destination)}`);

                if (!response.ok) {
                    throw new Error('Errore durante la ricerca');
                }

                const data = await response.json();
                setResults(data ?? []);
            } catch (fetchError) {
                console.error('Errore fetch search:', fetchError);
                setError('Si è verificato un errore durante la ricerca.');
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [destination]);

    return (
        <>
            <MainNavBar />
            <div className="container my-4">
                <h2>Risultati ricerca</h2>
                <p>Itinerari trovati per: <strong>{destination}</strong></p>

                {loading && <p>Caricamento...</p>}
                {error && <p className="text-danger">{error}</p>}
                {!loading && !error && results.length === 0 && (
                    <p>Nessun itinerario trovato per questa destinazione.</p>
                )}

                <div className="row g-3">
                    {results.map((itinerario) => (
                        <div key={itinerario.id} className="col-12 col-md-4">
                            <Card
                                as={Link}
                                to={`/personal-itinerary/${itinerario.id}`}
                                className="h-100 shadow-sm text-reset text-decoration-none position-relative itinerary-card"
                            >
                                <div className="card-body">
                                    <Card.Title>{itinerario.title}</Card.Title>
                                    <Card.Text>{itinerario.description}</Card.Text>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SearchResultsPage;

import { Col, Container, Row } from "react-bootstrap";
import '../css/Features.css';

function ItineriaFueatures() {
    return (
        <Container className="my-5 external-container">
            <Row className='justify-content-center g-5'>
                <Col xs={12} md={4} className='first-col'>
                    <div className="feature-card d-flex flex-column align-items-center text-center">
                        <div className="icon-wrapper my-4">
                            <svg style={{
                                width: "80",
                                height: "auto"
                            }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-book-open-check-icon lucide-book-open-check">
                                <path d="M12 21V7" />
                                <path d="m16 12 2 2 4-4" />
                                <path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3" />
                            </svg>
                        </div>
                        <h1 className="fw-bold">IL CENTRO DEL MONDO</h1>
                        <h3>Itineria è il libro dei desideri dove conservi i tuoi viaggi da sogno.</h3>
                    </div>

                </Col>
                <Col xs={12} md={4} className='second-col'>
                    <div className="feature-card d-flex flex-column align-items-center text-center">
                        <div className="icon-wrapper my-4">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                style={{ width: '70px', height: 'auto' }}
                            >
                                <path d="M512 96c0 50.2-59.1 125.1-84.6 155-3.8 4.4-9.4 6.1-14.5 5L320 256c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c53 0 96 43 96 96s-43 96-96 96l-276.4 0c8.7-9.9 19.3-22.6 30-36.8 6.3-8.4 12.8-17.6 19-27.2L416 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0c-53 0-96-43-96-96s43-96 96-96l39.8 0c-21-31.5-39.8-67.7-39.8-96 0-53 43-96 96-96s96 43 96 96zM117.1 489.1c-3.8 4.3-7.2 8.1-10.1 11.3l-1.8 2-.2-.2c-6 4.6-14.6 4-20-1.8-25.2-27.4-85-97.9-85-148.4 0-53 43-96 96-96s96 43 96 96c0 30-21.1 67-43.5 97.9-10.7 14.7-21.7 28-30.8 38.5l-.6 .7zM128 352a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM416 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                            </svg>
                        </div>
                        <h1 className="fw-bold">IL TUO VIAGGIO SU MISURA</h1>
                        <h3>
                            Personalizza ogni dettaglio importante per il viaggio, senza la paura di non trovare qualcosa nel momento del bisogno,<br />
                            o di non ricordarti dove trovarla.
                        </h3>
                    </div>
                </Col>
                <Col xs={12} md={4} className='third-col'>
                    <div className="feature-card d-flex flex-column align-items-center text-center">
                        <div className="icon-wrapper my-4">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                style={{ width: '70px', height: 'auto' }}
                            >
                                <path d="M497.5 341.1c-5.9 16.7-25.3 23-41.1 15.1l-178.2-89.1-1.6 3.2-88.8 177.7 292.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32l84.2 0 103.2-206.3 1.6-3.2-165.4-82.7c-15.8-7.9-22.4-27.3-12.5-42 45.9-68.6 124.1-113.8 212.9-113.8 141.4 0 256 114.6 256 256 0 29.8-5.1 58.5-14.5 85.1z" />
                            </svg>
                        </div>
                        <h1 className="fw-bold">ENJOY IT</h1>
                        <h3>
                            Una volta che avrai organizzato il tuo itinerario, non dovrai più preoccuparti di nulla.<br />
                            Non rimarrà che goderti il viaggio.
                        </h3>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ItineriaFueatures;
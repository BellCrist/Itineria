import { useRef } from "react";
import { Card, Container } from "react-bootstrap";
import parigi from "../assets/parigi.jpg";
import siviglia from "../assets/siviglia.jpg";
import "../css/ExperienceSlider.css";

function ExperienceSlider() {
    const scrollRef = useRef(null);

    const itineraries = [
        { id: 1, title: "Parigi Classica", desc: "La Tour Eiffel e i segreti del Louvre.", img: parigi },
        { id: 2, title: "Siviglia Storica", desc: "Jamon e flamenco", img: siviglia },
        { id: 3, title: "Roma Antica", desc: "Passeggiata imperiale tra Colosseo e Fori.", img: "https://picsum.photos/id/1016/400/500" },
        { id: 4, title: "New York Skyline", desc: "Le luci di Manhattan viste da Brooklyn.", img: "https://picsum.photos/id/1018/400/500" },
        { id: 5, title: "Londra Riverside", desc: "Dal Big Ben alla modernità della Tate.", img: "https://picsum.photos/id/1019/400/500" },
    ];

    const scroll = (direction) => {
        if (scrollRef.current) {
            // Calcolo della larghezza effettiva della card in quel momento
            const firstCard = scrollRef.current.querySelector('.itinerary-card-wrapper');
            const cardWidth = firstCard ? firstCard.offsetWidth : 320;
            const gap = 24;

            const scrollAmount = cardWidth + gap;

            if (direction === 'left') {
                scrollRef.current.scrollLeft -= scrollAmount;
            } else {
                scrollRef.current.scrollLeft += scrollAmount;
            }
        }
    };

    return (
        <section className="slider-full-width">
            <Container fluid className="px-5">
                <h2 className="text-center mb-3 fw-bold">ITINERARI CONSIGLIATI</h2>

                <div className="itinerary-scroll-container" ref={scrollRef}>
                    {itineraries.map((item) => (
                        <div key={item.id} className="itinerary-card-wrapper">
                            <Card className="border-0 shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={item.img}
                                    className="itinerary-card-img-overlay"
                                />
                                <div className="itinerary-card-text-content">
                                    <h3 className="itinerary-card-title-overlay">{item.title}</h3>
                                </div>
                                <a href="#" className="stretched-link" aria-label={`Scopri l'itinerario ${item.title}`}></a>
                            </Card>
                        </div>
                    ))}
                </div>


                <div className="itinerary-controls">
                    <button className="btn-circle" onClick={() => scroll('left')}>
                        <span style={{ marginBottom: '2px', marginRight: '2px' }}>&#10094;</span>
                    </button>
                    <button className="btn-circle" onClick={() => scroll('right')}>
                        <span style={{ marginBottom: '2px', marginLeft: '2px' }}>&#10095;</span>
                    </button>
                </div>
            </Container>
        </section>
    )
}

export default ExperienceSlider;
import imgHero from '../assets/hero_image_2.jpg';
import '../css/Hero.css';

function Hero() {
    return (
        <section className="hero">
            <img
                src={imgHero}
                className="hero-img"
                alt="Itineria"
            />
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">
                    <span className='brand-bg-pulse'>
                        ITINERIA
                    </span>
                    <br />Il tuo itinerario di viaggio, <br />
                    <span>tutto in unico posto.</span>
                </h1>

                <div className="hero-description">
                    <p>Smettila di impazzire per recuperare i biglietti dell'aereo, l'elenco dei ristoranti dove mangiare o i musei da visitare. <br />
                        Organizza i tuoi viaggi con la comodità di avere ogni singola informazione a portata di mano. <br />
                        Costruisci la roadmap del tuo viaggio senza perdere nemmeno un dettaglio.</p>
                </div>
            </div>
        </section>
    )
}

export default Hero;
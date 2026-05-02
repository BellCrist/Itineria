import ExperienceSlider from '../layout/ExperienceSlider';
import ItineriaFeatures from '../layout/Features';
import Footer from '../layout/Footer';
import Hero from '../layout/Hero';
import MainNavBar from '../layout/NavBar';

function Homepage() {

    return (
        <>
            <MainNavBar />
            <Hero />
            <ItineriaFeatures />
            <ExperienceSlider />
            <Footer />
        </>

    );
};

export default Homepage;
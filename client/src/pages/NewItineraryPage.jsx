import Footer from "../layout/Footer";
import MainNavBar from "../layout/NavBar";
import NewItineraryForm from "../layout/NewItineraryForm";

function NewItineraryPage() {
    return (
        <>
            <MainNavBar />
            <div style={{ textAlign: 'center', margin: '20px' }}>
                <h2>Crea il tuo Itinerario</h2>
            </div>
            <NewItineraryForm />
            <Footer/>
        </>
    )
}

export default NewItineraryPage;
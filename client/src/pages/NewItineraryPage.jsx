import MainNavBar from "../layout/NavBar";
import NewItineraryForm from "../layout/NewItineraryForm";

function NewItineraryPage(){
    return (
        <>
        <MainNavBar />
        <h1>Pagina per la creazione di un nuovo itinerario</h1>
        <NewItineraryForm />
        </>
    )
}

export default NewItineraryPage;
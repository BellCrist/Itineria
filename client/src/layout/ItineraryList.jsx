import { useEffect, useState } from "react";
import CreateItineraryButton from '../components/CreateItineraryButton';
function Itinerarylist() {
    const [listaItinerari, setlistaItinerari] = useState(false);

    useEffect(() => {
        const getUserItinerary = async () => {
            const response = await fetch('http://localhost:8080/api/user/itinerary-list', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                if(data.length > 0){
                    listaItinerari = true;
                }
            }
        }
    });


    return (

        <div className="itinerary-list-content">
            {listaItinerari ? <h3>sola</h3> : <h3>Lista vuota</h3>}
            <CreateItineraryButton />
        </div>
        
        
    )
}

export default Itinerarylist;
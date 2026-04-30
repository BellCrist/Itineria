import { useParams } from 'react-router-dom';
import ItineraryDetails from '../layout/ItineraryDetails';
import MainNavBar from '../layout/NavBar';

function ItineraryDetailPage() {
    const { id } = useParams();
    
    return (
        <>
            <MainNavBar />
            <ItineraryDetails id={id} />
        </>
    );
}

export default ItineraryDetailPage;

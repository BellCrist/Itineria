import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function CreateItineraryButton() {
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        navigate('/personal-itinerary/new-itinerary');
    }


    return (
        <Button variant="outline-primary" onClick={handleClick}>
            NUOVO ITINERARIO
        </Button>
    )
}

export default CreateItineraryButton;
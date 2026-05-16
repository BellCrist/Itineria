import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function CancelChanges() {
    const navigate = useNavigate();

    return (
        <Button
            variant="secondary"
            onClick={() => navigate('/personal-itinerary')}
            className='mx-2'
        >
            Annulla
        </Button>
    )
}

export default CancelChanges;
import Button from 'react-bootstrap/Button';

function AccessButton({ label, onClick }) {
    return (
        <Button variant="outline-primary" onClick={onClick}>
            {label}
        </Button>
    )
}

export default AccessButton;
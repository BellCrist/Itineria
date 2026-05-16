import Button from 'react-bootstrap/Button';

function SaveChangesButton({hasChanges}) {
    return (
        <Button
            variant="primary"
            type="submit"
            size="lg"
            disabled={!hasChanges}
            className='mx-2'
        >
            Salva
        </Button>
    )
}

export default SaveChangesButton;
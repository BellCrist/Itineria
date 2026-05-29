import { Person } from "react-bootstrap-icons";

function AccessButton({ onClick }) {
    return (
        <Person
            style={{ cursor: 'pointer' }}
            size={42}
            className='mx-4'
            onClick={onClick}
        />
    )
}

export default AccessButton;
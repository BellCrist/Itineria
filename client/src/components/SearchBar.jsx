import { Button, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import '../css/SearchBar.css';

function SearchBar() {
    return (
        <InputGroup
            className='mb-3 custom-search-pill'
            style={{ maxWidth: '600px', margin: '0 auto' }}
        >
            <Form.Control
                type="search"
                placeholder="Cerca un itinerario"
                className="border-start-0 ps-0"
                aria-label="Search"
            />
            <Button className="search-btn">
                <Search size={18}/>
            </Button>
        </InputGroup>
    )
}

export default SearchBar;
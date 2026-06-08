import { useState } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import '../css/SearchBar.css';

function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleSearch = (destination) => {
        if (!destination) return alert("Inserisci qualcosa!");
        navigate(`/search?destination=${encodeURIComponent(destination)}`);
    };

    return (
        <InputGroup
            className='mb-3 custom-search-pill'
            style={{ maxWidth: '600px', margin: '0 auto' }}
        >
            <Form.Control
                className="search-input-text"
                type="search"
                placeholder="Ricerca itinerari per destinazione"
                aria-label="Search"
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch(searchValue);
                    }
                }}
            />
            <Button className="search-btn" onClick={() => handleSearch(searchValue)}>
                <Search size={18} />
            </Button>
        </InputGroup>
    )
}

export default SearchBar;
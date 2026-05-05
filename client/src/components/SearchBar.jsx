import { useState } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import '../css/SearchBar.css';

function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState(null);

    const handleSearch = async (destination) => {
        if (!destination) return alert("Inserisci qualcosa!");
        try {
            const response = await fetch(`http://localhost:8080/api/itineraries/search?destination=${encodeURIComponent(destination)}`);
            const data = await response.json();

            setSearchResult(data);
            //TODO mostrare il risultato della ricerca a video
        } catch (error) {
            console.error("Errore nella chiamata:", error);
        }

    };

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
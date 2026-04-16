import { useEffect, useState } from 'react';
import Select from 'react-select';

const CountrySelect = ({ value, onChange }) => {
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
            .then((res) => res.json())
            .then((data) => {
                const formattedCountries = data.map((country) => ({
                    value: country.cca2,
                    label: country.name.common,
                })).sort((a, b) => a.label.localeCompare(b.label));

                setOptions(formattedCountries);
                setIsLoading(false);
            })
            .catch((err) => console.error("Errore nel caricamento stati:", err));
    }, []);

    return (
        <div>
            <label>Nazione</label>
            <Select
                options={options}
                isLoading={isLoading}
                placeholder="Scrivi per cercare..."
                isSearchable={true}
                isClearable={true}
                value={options.find(opt => opt.value === value) || null}
                onChange={(selectedOption) => {
                    onChange({
                        target: {
                            name: 'nazione',
                            value: selectedOption ? selectedOption.value : ''
                        }
                    });
                }}
            />
        </div>
    );
};

export default CountrySelect;
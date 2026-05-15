import { useEffect, useState } from 'react';
import Select from 'react-select';
import '../css/CountrySelector.css';

const CountrySelect = ({ value, onChange, showError = false }) => {
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isEmpty = value === '' || value === null;
    const shouldShowError = showError && isEmpty;

    const customStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: shouldShowError ? '#dc3545' : baseStyles.borderColor,
            borderWidth: shouldShowError ? '2px' : baseStyles.borderWidth,
        })
    };
    
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
        <div className={`country-select-wrapper ${shouldShowError ? 'country-select-error' : ''}`}>
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
                            name: 'country',
                            value: selectedOption ? selectedOption.value : ''
                        }
                    });
                }}
                styles={customStyles}
            />
        </div>
    );
};

export default CountrySelect;
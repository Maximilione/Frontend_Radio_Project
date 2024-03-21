import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { fetchRadioData } from './api'; // Importa la funzione di fetch
import { Radio } from './radio';

interface SearchbarProps{
  onRadioSelect: (radio: Radio) => void;
  radioList: Radio[];
}

const SearchBar: React.FC<SearchbarProps> = ({ onRadioSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Radio[]>([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchRadioData(debouncedSearchTerm)
        .then((data) => {
          setSuggestions(data.items); // Assicurati che sia data.items se l'API restituisce un oggetto con una proprietà items
        })
        .catch((error) => {
          console.error('Errore durante il fetch:', error);
        });
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    const selectedRadio = suggestions.find(radio => radio.id === selectedId);
    if (selectedRadio) {
      onRadioSelect(selectedRadio);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Cerca..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /><br></br>
      <select onChange={handleSelectChange} value={searchTerm}>
        <option value="">Seleziona una stazione radio</option>
        {suggestions.map((radio) => (
          <option key={radio.id} value={radio.id}>
            {radio.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SearchBar;
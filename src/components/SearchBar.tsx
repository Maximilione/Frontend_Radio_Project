import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { fetchRadioData } from './api'; 
import { Radio } from './radio';

interface SearchbarProps{
  onRadioSelect: (radio: Radio) => void;
  radioList: Radio[];
}

/**
 * React functional component for a search bar with radio select and suggestions.
 *
 * @param {function} onRadioSelect - Function to handle radio select
 * @return {JSX.Element} The search bar component
 */
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

  /**
   * Handles the change event when a select element is modified.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The event object for the select element change
   * @return {void} 
   */
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    const selectedRadio = suggestions.find(radio => radio.id === selectedId);
    if (selectedRadio) {
      onRadioSelect(selectedRadio);
    }
  };

  return (// searchbar
    <div className="search-bar">
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
import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Input, List, ListItem } from '@mui/material';

const EmployerDropdown = ({ value, onChange, updateEmployerDetails }) => {
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/employers')
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelect = (option) => {
    onChange(option);
    setSearchQuery(option);

    fetch(`http://127.0.0.1:5000/employer_details/${encodeURIComponent(option)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        updateEmployerDetails(data);
      })
      .catch(error => console.error('Error:', error));
  };

  const filteredOptions = searchQuery ? 
    options.filter(option => option && option.toLowerCase().includes(searchQuery.toLowerCase())) : 
    [];

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="search-employer">Employer</InputLabel>
      <Input id="search-employer" value={searchQuery} onChange={handleSearch} />
      <List>
        {filteredOptions.map((option, index) => (
          <ListItem 
            key={index} 
            button 
            onClick={() => handleSelect(option)}>
              {option}
          </ListItem>
        ))}
      </List>
    </FormControl>
  );
};

export default EmployerDropdown;

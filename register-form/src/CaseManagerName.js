import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Input, List, ListItem } from '@mui/material';

const CaseManagerName = ({ name, value, onChange }) => {
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/case-managers')
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelect = (option) => {
    onChange(option);
    setSearchQuery(option);  // Update the search field with the selected option
  };

  const filteredOptions = searchQuery ? 
    options.filter(option => option && option.toLowerCase().includes(searchQuery.toLowerCase())) : 
    [];

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="search-case-manager">Case Manager Name</InputLabel>
      <Input id="search-case-manager" value={searchQuery} onChange={handleSearch} />
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

export default CaseManagerName;

import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Input, List, ListItem } from '@mui/material';

const PractitionerName = ({ value, onChange, updatePractitionerDetails }) => {
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/practitioners')
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelect = (option) => {
    onChange(option.Full_Name);  // Sets the selected practitioner's name in the parent component
    setSearchQuery(option.Full_Name);
    fetch(`http://127.0.0.1:5000/practitioner_details/${option.Full_Name}`)
      .then(response => response.json())
      .then(data => {
        updatePractitionerDetails(data); // Now correctly referencing the prop
      })
      .catch(error => console.error('Error:', error));
  };
  

  const filteredOptions = searchQuery ? 
    options.filter(option =>
      (`${option.Full_Name} ${option.Practice} ${option.City}`).toLowerCase().includes(searchQuery.toLowerCase())
    ) : 
    [];

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="search-practitioner">Practitioner</InputLabel>
      <Input id="search-practitioner" value={searchQuery} onChange={handleSearch} />
      <List>
        {filteredOptions.map((option, index) => (
          <ListItem 
            key={index} 
            button 
            onClick={() => handleSelect(option)}>
              {`${option.Full_Name}, ${option.Practice}, ${option.City}`}
          </ListItem>
        ))}
      </List>
    </FormControl>
  );
};

export default PractitionerName;

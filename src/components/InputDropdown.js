import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton'; // Import DropdownButton
import Dropdown from 'react-bootstrap/Dropdown'; // Import Dropdown

function InputDropdown({ id, description, value, onChange }) {
  const handleDropdownChange = (selectedValue) => {
    onChange(id, selectedValue);
  };

  return (
    <InputGroup className="mb-3" size="lg" >
      <DropdownButton
        variant="outline-secondary"
        title={description} // Use description as the title of the dropdown button
        id={`input-dropdown-${id}`} // Use id to create a unique id for the dropdown button
        onSelect={handleDropdownChange} // Call handleDropdownChange when an item is selected
      >
        <Dropdown.Item eventKey="BB">BB</Dropdown.Item>
        <Dropdown.Item eventKey="VV">VV</Dropdown.Item>
        <Dropdown.Item eventKey="IV">IV</Dropdown.Item>
        <Dropdown.Item eventKey="PP">PP</Dropdown.Item>
        <Dropdown.Item eventKey="SKVO">SKVO</Dropdown.Item>
        <Dropdown.Item eventKey="AMBIENTACIJA">AMBIENTACIJA</Dropdown.Item>
        <Dropdown.Item eventKey="DELAVNICE">DELAVNICE</Dropdown.Item>
        <Dropdown.Item eventKey="ORODJE">ORODJE</Dropdown.Item>
        <Dropdown.Item eventKey="PLAHTE">PLAHTE</Dropdown.Item>
        <Dropdown.Item eventKey="HIGIENA">HIGIENA</Dropdown.Item>
        <Dropdown.Item eventKey="KNJIŽNICA">KNJIŽNICA</Dropdown.Item>
        <Dropdown.Item eventKey="OSTALO">OSTALO</Dropdown.Item>
        <Dropdown.Item eventKey="VRV">VRV</Dropdown.Item>

      </DropdownButton>
      <Form.Control
        value={value}
        readOnly // Make the input field read-only to display the selected value
        aria-label="Text input with dropdown button"
      />
    </InputGroup>
  );
}

export default InputDropdown;

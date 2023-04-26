import React, { useState} from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';

function CreateLandHoldingForm({ landHoldings, setLandHoldings, handleCloseLandHolding, owners }) {
  const [owner, setOwner] = useState('');
  const [legalEntity, setLegalEntity] = useState('');
  const [netMineralAcres, setNetMineralAcres] = useState('');
  const [mineralOwnerRoyalty, setMineralOwnerRoyalty] = useState('');
  const [section, setSection] = useState('');
  const [township, setTownship] = useState('');
  const [range, setRange] = useState('');
  const [titleSource, setTitleSource] = useState('');


  const handleOwnerChange = (e) => {
  setOwner(e.target.value);
  };

  const handleLegalEntityChange = (e) => {
    setLegalEntity(e.target.value);
  };

  const handleNetMineralAcresChange = (e) => {
    setNetMineralAcres(e.target.value);
  };

  const handleMineralOwnerRoyaltyChange = (e) => {
    setMineralOwnerRoyalty(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
  };

  const handleTownshipChange = (e) => {
    setTownship(e.target.value);
  };

  const handleRangeChange = (e) => {
    setRange(e.target.value);
  };

  const handleTitleSourceChange = (e) => {
    setTitleSource(e.target.value);
  };

  const titleSourceValues = ['Class A', 'Class B', 'Class C', 'Class D'];

const newLandHoldingUrl = 'http://localhost:5000/api/auth/newlandholding';

const handleChange = (e) => {
  e.preventDefault();
 
const name = `${section}-${township}-${range} ${legalEntity}`

const createdLandHolding = {
  
  name,
  ownerName: owner.ownerName,
  legalEntity,
  netMineralAcres,
  mineralOwnerRoyalty,
  section,
  township,
  range,
  titleSource
};

console.log(createdLandHolding);

fetch(newLandHoldingUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(createdLandHolding)
})
  .then(res => res.json())
  .then(data => {
    setLandHoldings([...landHoldings, data]);
    handleCloseLandHolding();
  })
  .catch(error => console.error('This is Error:', error));
}


return (
    <form onSubmit={handleChange}>
      <FormControl required>
        <InputLabel id="select-owner-label">Owners</InputLabel>
        <Select
          labelId="select-owner-label"
          id="owner"
          label="Owner"
          value={owner}
          onChange={handleOwnerChange}
        >
          {owners.map((owner) => (
            <MenuItem key={owner._id} value={owner}>
              {`${owner.ownerName}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        required
        id="legalEntity"
        label="Legal Entity"
        value={legalEntity}
        onChange={handleLegalEntityChange}
        margin="normal"
      />
      <TextField
        required
        id="netMineralAcres"
        label="Net Mineral Acres"
        value={netMineralAcres}
        onChange={handleNetMineralAcresChange}
        margin="normal"
      />
      <TextField
        required
        id="mineralOwnerRoyalty"
        label="Mineral Owner Royalty(%)"
        value={mineralOwnerRoyalty}
        onChange={handleMineralOwnerRoyaltyChange}
        margin="normal"
      />
      <TextField
        required
        id="section"
        label="Section"
        value={section}
        onChange={handleSectionChange}
        margin="normal"
      />
      <TextField
        required
        id="township"
        label="Township"
        value={township}
        onChange={handleTownshipChange}
        margin="normal"
      />
      <TextField
        required
        id="range"
        label="Range"
        value={range}
        onChange={handleRangeChange}
        margin="normal"
      />
      <FormControl required>
        <InputLabel id="select-title-source-label">Title Source</InputLabel>
        <Select
          labelId="select-title-source-label"
          id="titleSource"
          label="Title Source"
          value={titleSource}
          onChange={handleTitleSourceChange}
        >
          {titleSourceValues.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" onClick={() => window.location.reload(false)}>
        Submit
      </Button>
    </form>
  );

}

export default CreateLandHoldingForm;




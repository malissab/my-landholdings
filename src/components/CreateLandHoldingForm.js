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
const apiUrl = process.env.REACT_APP_API_URL;


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

const newLandHoldingUrl = `${apiUrl}/api/auth/newlandholding`;

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
      <FormControl required style={{ marginTop: 5 }}>
        <InputLabel id="select-owner-label" 
 >Owners</InputLabel>
        <Select
          labelId="select-owner-label"
          id="owner"
          label="Owner"
          value={owner}
          onChange={handleOwnerChange}
          sx={{width: 550, display: "flex",
          flexDirection: "column"}}>
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
        sx={{display: "flex",
        flexDirection: "column", marginTop: 1}}

      />
      <TextField
        required
        id="netMineralAcres"
        label="Net Mineral Acres"
        value={netMineralAcres}
        onChange={handleNetMineralAcresChange}
        margin="normal"
        sx={{display: "flex",
        flexDirection: "column", marginTop: 1}}
      />
      <TextField
        required
        id="mineralOwnerRoyalty"
        label="Mineral Owner Royalty(%)"
        value={mineralOwnerRoyalty}
        onChange={handleMineralOwnerRoyaltyChange}
        margin="normal"
        sx={{display: "flex",
        flexDirection: "column", marginTop: 1}}
      />
      <TextField
        required
        id="section"
        label="Section"
        value={section}
        onChange={handleSectionChange}
        margin="normal"
        helperText="Numbers only"
        sx={{display: "flex",
        flexDirection: "column", marginTop: 1}}
      />
      <TextField
        required
        id="township"
        label="Township"
        value={township}
        onChange={handleTownshipChange}
        margin="normal"
        helperText="Must be 3 digits, end in N or S"
        sx={{display: "flex",
        flexDirection: "column", marginTop: 1}}
      />
      <TextField
        required
        id="range"
        label="Range"
        value={range}
        onChange={handleRangeChange}
        margin="normal"
        helperText="Must be 3 digits, end in E or W"
        sx={{display: "flex",
        flexDirection: "column", marginTop: 1}}
      />
      <FormControl required>
        <InputLabel id="select-title-source-label">Title Source</InputLabel>
        <Select
          labelId="select-title-source-label"
          id="titleSource"
          label="Title Source"
          value={titleSource}
          onChange={handleTitleSourceChange}
          style={{ width: 200 }}
        >
          {titleSourceValues.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      < br />
      <Button sx={{marginTop: 1}}type="submit" variant="contained" color="primary" onClick={() => window.location.reload(false)}>
        Submit
      </Button>
    </form>
  );

}

export default CreateLandHoldingForm;




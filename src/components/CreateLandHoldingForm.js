import React, {useState} from 'react'
import { TextField, Button } from '@mui/material';



function CreateLandingHoldingForm({ landHoldings, setLandHoldings, handleClose }) {
// const [name, setName] = useState('');
const [owner, setOwner] = useState('');
const [legalEntity, setLegalEntity] = useState('');
const [netMineralAcres, setNetMineralAcres] = useState('');
const [mineralOwnerRoyalty, setMineralOwnerRoyalty] = useState('');
// const [sectionName, setSectionName] = useState('');
const [section, setSection] = useState('');
const [township, setTownship] = useState('');
const [range, setRange] = useState('');
const [titleSource, setTitleSource] = useState('');


const newLandHoldingUrl = 'http://localhost:5000/api/auth/newlandholding';



const handleLandHolding = (e) => {
        e.preventDefault();
        const createdLandHolding = { owner, legalEntity, netMineralAcres, mineralOwnerRoyalty, section, township, range, titleSource };
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
            handleClose();
        });
    };


  return (
    <form onSubmit={handleLandHolding}>
    <TextField
      required
      id="owner"
      label="Owner"
      value={owner}
      onChange={(e) => setOwner(e.target.value)}      
      margin="normal"
    />
    <TextField
      required
      id="legalEntity"
      label="Legal Entity"
      value={legalEntity}
      onChange={(e) => setLegalEntity(e.target.value)}      
      margin="normal"
    />
    <TextField
      required
      id="netMineralAcres"
      label="Net Mineral Acres"
      value={netMineralAcres}
      onChange={(e) => setNetMineralAcres(e.target.value)}      
      margin="normal"
    />
    <TextField
      required
      id="mineralOwnerRoyalty"
      label="Mineral Owner Royalty(%)"
      value={mineralOwnerRoyalty}
      onChange={(e) => setMineralOwnerRoyalty(e.target.value)}      
      margin="normal"
    />
    <TextField
      required
      id="section"
      label="Section"
      value={section}
      onChange={(e) => setSection(e.target.value)}      
      margin="normal"
    />
    <TextField
      required
      id="township"
      label="Township"
      value={township}
      onChange={(e) => setTownship(e.target.value)}      
      margin="normal"
    />
    <TextField
      required
      id="range"
      label="Range"
      value={range}
      onChange={(e) => setRange(e.target.value)}      
      margin="normal"
    />
    <TextField
      required
      id="titleSource"
      label="Title Source"
      value={titleSource}
      onChange={(e) => setTitleSource(e.target.value)}      
      margin="normal"
    />
    <Button type="submit" variant="contained" color="primary">
      Create
    </Button>
  </form>
  );
}

export default CreateLandingHoldingForm
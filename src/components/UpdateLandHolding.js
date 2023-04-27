import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

function UpdateLandHolding({landholding, handleCloseEditLandHolding}) {
  const [legalEntity, setLegalEntity] = useState(landholding.legalEntity);
  const [netMineralAcres, setNetMineralAcres] = useState(landholding.netMineralAcres);
  const [mineralOwnerRoyalty, setMineralOwnerRoyalty] = useState(landholding.mineralOwnerRoyalty);
  const [section, setSection] = useState(landholding.section);
  const [township, setTownship] = useState(landholding.township);
  const [range, setRange] = useState(landholding.range);
  const [titleSource, setTitleSource] = useState(landholding.titleSource);

  const handleSubmit = (e) => {
    e.preventDefault();

    const patchUrl = `https://my-landholdings.vercel.app/api/auth/newlandholding/${landholding._id}`

    const name = `${section}-${township}-${range} ${legalEntity}`

    const updatedLandHolding = {
      name,
      legalEntity: legalEntity,
      netMineralAcres: netMineralAcres,
      mineralOwnerRoyalty: mineralOwnerRoyalty,
      section: section,
      township: township,
      range: range,
      titleSource: titleSource
    };

    fetch (patchUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        }, 
    body: JSON.stringify(updatedLandHolding),
    })
    .then (res => {
        if(!res.ok){
            throw new Error('Patch response error')
        }
        return res.json();
    })
  };


  const titleSourceValues = ['Class A', 'Class B', 'Class C', 'Class D'];

  return (
    <div>
        <Dialog open={true} onClose={handleCloseEditLandHolding}>
         <DialogTitle>Update Landholding</DialogTitle>
         <DialogContent>
         <form onSubmit={handleSubmit}>
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
           <br />
      <FormControl required>
 
        <InputLabel id="select-title-source-label">Title Source</InputLabel>
        
        <Select
          labelId="select-title-source-label"
          id="titleSource"
          label="Title Source"
          value={titleSource}
          onChange={(e) => setTitleSource(e.target.value)}
          >
          {titleSourceValues.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <Button sx={{marginTop: 1}} type="submit" variant="contained" color="primary" onClick={() => window.location.reload(false)}>
        Update
      </Button>
    </form>
    </DialogContent>
    </Dialog>
    </div>
  )
}

export default UpdateLandHolding
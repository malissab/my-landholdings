import React, {useState} from 'react'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';



function CreateOwnerForm({ owners, setOwners, handleCloseOwners }) {
const [ownerName, setOwnerName] = useState('');
const [entityType, setEntityType] = useState('');
const [ownerType, setOwnerType] = useState('');
const [address, setAddress] = useState('');
const [totalNumberOfLandHoldings, setTotalNumberOfLandHoldings] = useState('');

const entityTypeValues = ['Company', 'Individual', 'Investor', 'Trust'];
const ownerTypeValues = ['Competitor', 'Seller', 'Investor', 'Professional'];

const newOwnerUrl = 'https://my-landholdings.vercel.app/api/auth/newowner';




const handleChange = (e) => {
        e.preventDefault();
        const createdOwner = { ownerName, entityType, ownerType, address, totalNumberOfLandHoldings };
        fetch(newOwnerUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(createdOwner)
        })
        .then(res => res.json())
        .then(data => {
            setOwners([...owners, data]);
            handleCloseOwners();
        });
    };


  return (
    <form onSubmit={handleChange}>
    <TextField
      required
      id="ownerName"
      label="Owner Name"
      value={ownerName}
      onChange={(e) => setOwnerName(e.target.value)}      
      margin="normal"
      sx={{display: "flex",
      flexDirection: "column", marginTop: 1}}
    />
    <FormControl sx={{display: "flex",
        flexDirection: "column", marginTop: 1}} required>
        <InputLabel id='select-entity-type-label'>Entity Type</InputLabel>
        <Select
          labelId='select-entity-type-label'
          id="entityType"
          label="Entity Type"
        value={entityType}
        onChange={(e) => setEntityType(e.target.value)}>     
        {entityTypeValues.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>

        </FormControl>
        <FormControl sx={{display: "flex",
        flexDirection: "column", marginTop: 1}} required>
        <InputLabel id='select-owner-type-label'>Owner Type</InputLabel>
        <Select
          labelId='select-owner-type-label'
          id="ownerType"
          label="Owner Type"
        value={ownerType}
        onChange={(e) => setOwnerType(e.target.value)}>     
        {ownerTypeValues.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
    <TextField
      required
      id="address"
      label="Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}      
      margin="normal"
      sx={{display: "flex",
      flexDirection: "column", marginTop: 1}}
    />
    <TextField
      required
      id="totalNumberOfLandHoldings"
      label="Total Number Of Land Holdings"
      value={totalNumberOfLandHoldings}
      onChange={(e) => setTotalNumberOfLandHoldings(e.target.value)}      
      margin="normal"
    />
   
    <Button sx={{margin: 3}} type="submit" variant="contained" color="primary">
      Create
    </Button>
  </form>
  );
}

export default CreateOwnerForm
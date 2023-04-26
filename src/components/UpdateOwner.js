import React, { useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

function UpdateOwner({ owner, setOwners, handleCloseEditOwner }) {
const entityTypeValues = ['Company', 'Individual', 'Investor', 'Trust'];
const ownerTypeValues = ['Competitor', 'Seller', 'Investor', 'Professional'];

    const putUrl = `http://localhost:5000/api/auth/newowner/${owner._id}`

        const [formData, setFormData] = useState({
          ownerName: owner.ownerName,
          entityType: owner.entityType,
          ownerType: owner.ownerType,
          address: owner.address,
          totalNumberOfLandHoldings: owner.totalNumberOfLandHoldings,
        });
      
        const handleSubmit = (e) => {
          e.preventDefault();
          fetch(putUrl, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setOwners(prevOwners => prevOwners.map(prevOwner => prevOwner._id === owner._id ? owner : prevOwner));
            })
            .catch((error) => console.error(error));
        };
      
        const handleChange = (e) => {
          setFormData({ ...formData, [e.target.id]: e.target.value });
        };

  return (
    <Dialog open={true} onClose={handleCloseEditOwner}>
         <DialogTitle>Update Owner</DialogTitle>
         <DialogContent>
    <form onSubmit={handleSubmit}>
    <TextField
      required
      id="ownerName"
      label="Owner Name"
      value={formData.ownerName}
      onChange={handleChange}      
      margin="normal"
    />
    <FormControl required>
        <InputLabel id='select-entity-type-label'>Entity Type</InputLabel>
        <Select
          labelId='select-entity-type-label'
          id="entityType"
          label="Entity Type"
        value={formData.entityType}
        onChange={handleChange}>     
        {entityTypeValues.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>

        </FormControl>
        <FormControl required>
        <InputLabel id='select-owner-type-label'>Owner Type</InputLabel>
        <Select
          labelId='select-owner-type-label'
          id="ownerType"
          label="Owner Type"
        value={formData.ownerType}
        onChange={handleChange}>     
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
      value={formData.address}
      onChange={handleChange}            
      margin="normal"
    />
    <TextField
      required
      id="totalNumberOfLandHoldings"
      label="Total Number Of Land Holdings"
      value={formData.totalNumberOfLandHoldings}
      onChange={handleChange}      
      
      margin="normal"
    />
      <Button type="submit" variant="contained" color="primary" onClick={() => window.location.reload(false)}>
        Update
      </Button>
    </form>
    </DialogContent>
    </Dialog>
  )
}

export default UpdateOwner
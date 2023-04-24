import React, {useState} from 'react'
import { TextField, Button } from '@mui/material';



function CreateOwnerForm({ owners, setOwners, handleClose }) {
const [ownerName, setOwnerName] = useState('');
const [entityType, setEntityType] = useState('');
const [ownerType, setOwnerType] = useState('');
const [address, setAddress] = useState('');
const [totalNumberOfLandHoldings, setTotalNumberOfLandHoldings] = useState('');

const newOwnerUrl = 'http://localhost:5000/api/auth/newowner';



const handleOwner = (e) => {
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
            handleClose();
        });
    };


  return (
    <form onSubmit={handleOwner}>
    <TextField
      required
      id="ownerName"
      label="Owner Name"
      value={ownerName}
      onChange={(e) => setOwnerName(e.target.value)}      
      margin="normal"
    />
    <TextField
      required
      id="entityType"
      label="Entity Type"
      value={entityType}
      onChange={(e) => setEntityType(e.target.value)}      
      margin="normal"
    />
    <TextField
      required
      id="ownerType"
      label="Owner Type"
      value={ownerType}
      onChange={(e) => setOwnerType(e.target.value)}      
      margin="normal"
    />
    <TextField
      required
      id="address"
      label="Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}      
      margin="normal"
    />
    <TextField
      required
      id="totalNumberOfLandHoldings"
      label="Total Number Of Land Holdings"
      value={totalNumberOfLandHoldings}
      onChange={(e) => setTotalNumberOfLandHoldings(e.target.value)}      
      margin="normal"
    />
    <Button type="submit" variant="contained" color="primary">
      Create
    </Button>
  </form>
  );
}

export default CreateOwnerForm
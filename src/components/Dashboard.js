import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Toolbar, Typography, AppBar } from "@mui/material";
import CreateOwnerForm from "./CreateOwnerForm";
import CreateLandHoldingForm from "./CreateLandHoldingForm";
import UpdateLandHolding from "./UpdateLandHolding";
import UpdateOwner from "./UpdateOwner"
const apiUrl = process.env.REACT_APP_API_URL;


function Dashboard({ isSignedUp, isLoggedIn }) {
  const [owners, setOwners] = useState([]);
  const [showLandHoldingForm, setShowLandHoldingForm] = useState(false);
  const [showOwnerForm, setShowOwnerForm] = useState(false);
  const [selectedLandHolding, setSelectedLandHolding] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null);


  const [openOwners, setOpenOwners] = useState(false);
  const [landHoldings, setLandHoldings] = useState([]);
  const [openLandHoldings, setOpenLandHoldings] = useState(false);
  const ownersUrl = `${apiUrl}/api/auth/owners`;
  const landHoldingsUrl = `${apiUrl}/api/auth/landholdings`;


  const handleOpenOwners = () => {
    setOpenOwners(true);
  };

  const handleCloseOwners = () => {
    setOpenOwners(false);
  };

  const handleOpenLandHolding = () => {
    setOpenLandHoldings(true);
  };

  const handleCloseLandHolding = () => {
    setOpenLandHoldings(false);
  };

  const handleEditLandHolding = (landholding) => {
    setSelectedLandHolding(landholding);
    setShowLandHoldingForm(true);
  }

  const handleCloseEditLandHolding = () => {
    setShowLandHoldingForm(false);
  }

  const handleEditOwner = (owner) => {
    setSelectedOwner(owner);
    setShowOwnerForm(true);
  }

  const handleCloseEditOwner = () => {
    setShowOwnerForm(false);
  }

  const handleDeleteOwner = async (owner) => {
      try {
        const response = await fetch(`${apiUrl}/api/auth/owners/${owner._id}`, {
          method: 'DELETE'
        });
    
        if (response.ok) {
          const landHoldingsResponse = await fetch(`${apiUrl}/api/auth/landholdings/owner/${owner._id}`, {
            method: 'DELETE'
          });
          
          if (landHoldingsResponse.ok) {
            window.location.reload(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
  

  useEffect(() => {
    fetch(ownersUrl)
      .then((res) => res.json())
      .then((data) => setOwners(data));
  }, []);

  useEffect(() => {
    fetch(landHoldingsUrl)
      .then((res) => res.json())
      .then((data) => 
      setLandHoldings(data));
  }, []);

  if (isSignedUp || isLoggedIn === true) {
    return (
      <>
       <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar position="static">
        <Toolbar >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Phoenix Capital Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      <TableContainer component={Paper}>
        <Table sx = {{ minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Owner Name</TableCell>
              <TableCell>Entity Type</TableCell>
              <TableCell>Owner Type</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Total # of Land Holdings</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {owners.map((owner) => (
            <TableRow key={owner._id}>
              <TableCell>{owner.ownerName}</TableCell>
              <TableCell>{owner.entityType}</TableCell>
              <TableCell>{owner.ownerType}</TableCell>
              <TableCell>{owner.address}</TableCell>
              <TableCell>{owner.totalNumberOfLandHoldings}</TableCell>
              <TableCell>
                <Button sx={{margin: 1}} variant="contained" color="primary" onClick={() => handleEditOwner(owner)}>Edit</Button>
               <Button variant="contained" color="primary" onClick={() => handleDeleteOwner(owner)}>Delete</Button> 
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
          </Table>
          </TableContainer>
          { showOwnerForm && <UpdateOwner owner={selectedOwner} setOwners={setOwners} handleCloseEditOwner={handleCloseEditOwner} />}
        <Button variant="contained" color="primary" onClick={handleOpenOwners} sx={{ margin: 1}}>
          Create Owner
        </Button>
        <Dialog open={openOwners} onClose={handleCloseOwners}>
          <DialogTitle>Create Owner</DialogTitle>
          <DialogContent>
            <CreateOwnerForm
              owners={owners}
              setOwners={setOwners}
              handleCloseOwners={handleCloseOwners}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseOwners}>Cancel</Button>
          </DialogActions>
        </Dialog>

           <TableContainer component={Paper}>
           <Table sx = {{ minWidth: 650}} aria-label="simple table">
             <TableHead>
               <TableRow>  
              <TableCell>Name</TableCell>
              <TableCell>Owner Name</TableCell>
              <TableCell>Entity Type</TableCell>
              <TableCell>Net Mineral Acres</TableCell>             
              <TableCell>Mineral Owner Royalty(%)</TableCell>
              <TableCell>Section Name</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Township</TableCell>
              <TableCell>Range</TableCell>
              <TableCell>Title Source</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {landHoldings.map((landholding) => {
              return (
                <TableRow key={landholding._id}>
                <TableCell>{landholding.name}</TableCell>
                <TableCell>{landholding.owner ? landholding.owner.ownerName : ''}</TableCell>
            <TableCell>{landholding.legalEntity}</TableCell>
            <TableCell>{landholding.netMineralAcres}</TableCell>
            <TableCell>{landholding.mineralOwnerRoyalty}%</TableCell>
            <TableCell>{landholding.sectionName}</TableCell>
            <TableCell>{landholding.section}</TableCell>
            <TableCell>{landholding.township}</TableCell>
            <TableCell>{landholding.range}</TableCell>
            <TableCell>{landholding.titleSource}</TableCell>
            <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditLandHolding(landholding)}>Edit</Button>
                {/* <Button variant="contained" color="primary" onClick={() => handleDeleteLandHolding(landholding)}>Delete</Button> */}
              </TableCell>
            </TableRow>
              )
            })}
            </TableBody>      
          </Table>
      </TableContainer>
      {showLandHoldingForm && <UpdateLandHolding landholding={selectedLandHolding} handleCloseEditLandHolding={handleCloseEditLandHolding}/>}
        
          <Button variant="contained" color="primary" onClick={handleOpenLandHolding} sx={{ margin: 1 }}>
        Create Landholding
      </Button>
      <Dialog open={openLandHoldings} onClose={handleCloseLandHolding}>
        <DialogTitle>Create Landholding</DialogTitle>
        <DialogContent>
          <CreateLandHoldingForm 
          landHoldings={landHoldings} 
          setLandHoldings={setLandHoldings} 
          handleCloseLandHolding={handleCloseLandHolding}
          owners={owners} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLandHolding}>Cancel</Button>
        </DialogActions>
      </Dialog>
      </>
    );
    
  } else {
    return (
      <Typography variant="h5">
      Please <Link to='/signup'>sign up</Link> or <Link to='/login'>login</Link> to view the dashboard.
      </Typography>
    )
  }
}

export default Dashboard;

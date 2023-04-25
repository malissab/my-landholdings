import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Toolbar, Typography, AppBar } from "@mui/material";
import CreateOwnerForm from "./CreateOwnerForm";
import CreateLandHoldingForm from "./CreateLandHoldingForm";

function Dashboard({ isSignedUp, isLoggedIn }) {
  const [owners, setOwners] = useState([]);
  const [openOwners, setOpenOwners] = useState(false);
  const [landHoldings, setLandHoldings] = useState([]);
  const [openLandHoldings, setOpenLandHoldings] = useState(false);
  const ownersUrl = "http://localhost:5000/api/auth/owners";
  const landHoldingsUrl = "http://localhost:5000/api/auth/landholdings";




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
            My Land Dashboard
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
            </TableRow>
          ))}
          </TableBody>
          </Table>
          </TableContainer>
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
            </TableRow>
          </TableHead>
          <TableBody >
            {landHoldings.map((landholding) => {
              console.log(landholding);
              return (
                <TableRow key={landholding._id}>
                <TableCell>{landholding.name}</TableCell>
                <TableCell>{landholding.owner.ownerName}</TableCell>
            <TableCell>{landholding.legalEntity}</TableCell>
            <TableCell>{landholding.netMineralAcres}</TableCell>
            <TableCell>{landholding.mineralOwnerRoyalty}%</TableCell>
            <TableCell>{landholding.sectionName}</TableCell>
            <TableCell>{landholding.section}</TableCell>
            <TableCell>{landholding.township}</TableCell>
            <TableCell>{landholding.range}</TableCell>
            <TableCell>{landholding.titleSource}</TableCell>
            </TableRow>
              )
            })}
            </TableBody>      
          </Table>
      </TableContainer>
        
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
    
  }
}

export default Dashboard;
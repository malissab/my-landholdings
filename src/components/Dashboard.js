import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CreateOwnerForm from "./CreateOwnerForm";
import CreateLandHoldingForm from "./CreateLandHoldingForm";

function Dashboard({ isSignedUp, isLoggedIn }) {
  const [owners, setOwners] = useState([]);
  const [landHoldings, setLandHoldings] = useState([]);
  const ownersUrl = "http://localhost:5000/api/auth/owners";
  const landHoldingsUrl = "http://localhost:5000/api/auth/landholdings";
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch(ownersUrl)
      .then((res) => res.json())
      .then((data) => setOwners(data));
  }, []);

  useEffect(() => {
    fetch(landHoldingsUrl)
      .then((res) => res.json())
      .then((data) => setLandHoldings(data));
  }, []);

  if (isSignedUp || isLoggedIn === true) {
    return (
      <div>
        <h1>My Land Dashboard</h1>
        <h2>Owners</h2>
        <ul>
          {owners.map((owner) => (
            <div key={owner._id}>
              <p>{owner.ownerName}</p>
              <p>{owner.entityType}</p>
              <p>{owner.ownerType}</p>
              <p>{owner.address}</p>
              <p>{owner.totalNumberOfLandHoldings}</p>
            </div>
          ))}
        </ul>

        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Create Owner
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Owner</DialogTitle>
          <DialogContent>
            <CreateOwnerForm
              owners={owners}
              setOwners={setOwners}
              handleClose={handleClose}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <h2>Landholdings</h2>
        <ul>
        {landHoldings.map((landholding) => (
          <div key={landholding._id}>
            <p>{landholding.name}</p>
            <p>{landholding.owner.ownerName}</p>
            <p>{landholding.legalEntity}</p>
            <p>{landholding.mineralOwnerRoyalty}%</p>
            <p>{landholding.sectionName}</p>
            <p>{landholding.section}</p>
            <p>{landholding.township}</p>
            <p>{landholding.range}</p>
            <p>{landholding.titleSource}</p>
          </div>
        ))}
        </ul>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create Landholding
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Landholding</DialogTitle>
        <DialogContent>
          <CreateLandHoldingForm landHoldings={landHoldings} setLandHoldings={setLandHoldings} handleClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  } else {
    return (
      <div>
        Please <Link to="/signup">sign up</Link> or{" "}
        <Link to="/login">log in</Link> to access the dashboard.
      </div>
    );
  }
}

export default Dashboard;

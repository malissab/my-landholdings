import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

function Dashboard({ isSignedUp, isLoggedIn }) {
const [owners, setOwners] = useState([]);
const [landHoldings, setLandHoldings] = useState([]);
const ownersUrl = 'http://localhost:5000/api/auth/owners';
const landHoldingsUrl = 'http://localhost:5000/api/auth/landholdings';


useEffect(() => {
  fetch(ownersUrl)
  .then(res => res.json())
  .then(data => setOwners(data))
}, [])

useEffect(() => {
  fetch(landHoldingsUrl)
  .then(res => res.json())
  .then(data => setLandHoldings(data))
}, [])



  if (isSignedUp || isLoggedIn === true) {
    return (
      <div>
        <h1>My Land Dashboard</h1>
        <h2>Owners</h2>
        <ul>
          {owners.map(owner =>
            <div key={owner._id}>
              <p>{owner.ownerName}</p>
              <p>{owner.entityType}</p>
              <p>{owner.ownerType}</p>
              <p>{owner.address}</p>
              <p>{owner.totalNumberOfLandHoldings}</p>
            </div>
          )}
        </ul>
        <h2>Land Holdings</h2>
        {landHoldings.map(landholding =>
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
          )}
      </div>
    )
  } else {
    return (
      <div>
        Please <Link to='/signup'>sign up</Link> or <Link to='/login'>log in</Link> to access the dashboard.
      </div>
    );
  }
}

export default Dashboard;
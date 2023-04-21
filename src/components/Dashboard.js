import React from 'react'
import { Navigate } from "react-router-dom";


function Dashboard({ isSignedUp }) {
    if(!isSignedUp){
        return <Navigate to='/signup' />
    }
  return (
    <div>
    Welcome to My Land App
    </div>
  )
}

export default Dashboard
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { TextField, Button, Paper, Typography } from '@mui/material'
const apiUrl = process.env.REACT_APP_API_URL;


function SignUpForm({ isSignedUp, setIsSignedUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const signUpUrl = `${apiUrl}/api/auth/signup`;


  if (isSignedUp) {
    return <Navigate to="/dashboard" />;
  }

  const handleSignup = (e) => {
    e.preventDefault();
    const newUser = { email, password, passwordConfirmation };
    
    fetch(signUpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        
        localStorage.setItem("token", data.token);
        setIsSignedUp(true);
      });
  };

  return (
    <> 
      <Typography variant="h4">My Phoenix Dashboard</Typography>  
      <form onSubmit={handleSignup}>
        <Paper sx={{
      width: "30%",
      margin: "0 auto",
      padding: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>      
         <TextField
        sx={{width: "100%"}}
            type="email"
            value={email}
            name="email"
            placeholder="Email"
            helperText="Please enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />         
        <br />
                
        <TextField
        sx={{width: "100%"}}
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            helperText="Please enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        <br /> 
        <TextField
        sx={{width: "100%"}}
            type="password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            placeholder="Password Confirmation"
            helperText="Please reenter your password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        <br />
                <Button sx={{alignItems: "center"}} type="submit" variant="contained" color="primary">Sign up</Button>
        <Typography sx={{marginTop: 2}}>Already have an account? <Link to='/login'> Log In</Link></Typography>     
        </Paper> 
      </form>
    </>
  );
}

export default SignUpForm;

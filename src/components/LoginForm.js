import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextField, Button, Paper } from '@mui/material'


function LoginForm({ isLoggedIn, setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginUrl = 'http://localhost:5000/api/auth/login';

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
      }

      const handleLogin = (e) => {
            e.preventDefault();
            const loggedInUser = { email, password };
            fetch(loginUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(loggedInUser)
            })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('token', data.token);
                setIsLoggedIn(true);
            });
    
        }
  
    return (
        <>
      <form onSubmit={handleLogin}>
        <Paper sx={{
      width: "70%",
      maxWidth: 300,
      margin: "0 auto",
      padding: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 10
    }}>
        <TextField
        sx={{width: "100%"}}
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br />
        <TextField
        sx={{width: "100%"}}
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br />

        <Button sx={{alignItems: "center"}} type="submit" variant="contained" color="primary" >Login</Button>
        <br />
        Not a member?<Link to='/signup'>Create an account</Link>
        </Paper>
      </form>
      </>
    );
}

export default LoginForm
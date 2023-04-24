import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


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
        Login
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />

        <button type="submit">Login</button>
        <br />
        <Link to='/signup'>Create an account</Link>
      </form>
      </>
    );
}

export default LoginForm
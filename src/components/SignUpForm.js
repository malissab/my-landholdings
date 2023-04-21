import React, { useState } from 'react';
import { Navigate } from "react-router-dom";


function SignUpForm({ isSignedUp, setIsSignedUp }) {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const signUpUrl = 'http://localhost:5000/api/auth/signup';

    if(isSignedUp){
        return <Navigate to='/dashboard' />
    }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { email, password };
        fetch(signUpUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setIsSignedUp(true);
        });

    }
    
      return (
        <div>
          Signup Form
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )
    }
    
    export default SignUpForm;
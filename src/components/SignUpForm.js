import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function SignUpForm({ isSignedUp, setIsSignedUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const signUpUrl = "http://localhost:5000/api/auth/signup";


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
        console.log(data);
        localStorage.setItem("token", data.token);
        setIsSignedUp(true);
      });
  };

  return (
    <div>
            Signup       
      <form onSubmit={handleSignup}>
                
        <label>
                    Email:           
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
                  
        </label>
                
        <br />
                
        <label>
                    Password:           
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
                  
        </label>
                
        <br /> 
        <label>
                    Password Confirmation:           
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
                  
        </label>
                
        <br />
                <button type="submit">Sign up</button>
              
      </form>
          
    </div>
  );
}

export default SignUpForm;

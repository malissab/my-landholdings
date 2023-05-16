import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';

function App() {
  const [isSignedUp, setIsSignedUp] = useState(localStorage.getItem('isSignedUp') === 'true');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    localStorage.setItem('isSignedUp', isSignedUp)
    localStorage.setItem('isLoggedIn', isLoggedIn)

  }, [isSignedUp, isLoggedIn])


  return (
    <Router>
      <Routes>
      <Route path="/dashboard" element={<Dashboard isSignedUp={isSignedUp} isLoggedIn={isLoggedIn} />} />
      <Route path="/signup" element={<SignUpForm isSignedUp={isSignedUp} setIsSignedUp={setIsSignedUp}/>} />
      <Route path="/" element={<LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;

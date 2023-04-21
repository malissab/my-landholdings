import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm isSignedUp={isSignedUp} setIsSignedUp={setIsSignedUp}/>} />
        <Route path="/dashboard" element={<Dashboard isSignedUp={isSignedUp} />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';





function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {email, password};

        fetch('https://us-east-1.aws.data.mongodb-api.com/app/mylandapp-howts/endpoint/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }



  return (
    <div>
        Signup
        <form onSubmit={handleSubmit}>
            <label>
                Email: 
                <input type="email" value={email} onChange={handleEmail} />
            </label>
            <br />
            <label>
                Password: 
                <input type="password" value={password} onChange={handlePassword} />
            </label>
            <br />
            <button type="submit">Sign Up</button>
        </form>

    </div>
  )
}

export default Signup
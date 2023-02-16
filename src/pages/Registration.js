import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  }

  const handleEmailChange = event => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();

    const userData = {
      name,
      email,
      password
    }

    axios.post('http://localhost:5000/api/register', userData)
      .then(res => {
        console.log(res.data);
        // redirect user to login page
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button type="submit">Register</button>
    </form>
  );
}

export default Registration;

import React, { useState } from 'react';
import axios from 'axios';
import {Navigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);


  const handleEmailChange = event => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();

    const userData = {
      email,
      password
    }

    axios.post('http://localhost:5000/api/login', userData)
      .then(res => {
        console.log(res.data);
        // redirect user to home page
    setRedirect(true);

      })
      .catch(err => {
        console.log(err);
      });
  }

  if(redirect){
    return  <Navigate to={'/'} />
  } 

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

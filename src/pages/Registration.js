import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
<div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">      
    <div className="max-w-md w-full space-y-8">
        <div><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900"> Register your account</h2></div>
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
    <label className="block text-gray-700 font-bold mb-2" >Useraname</label>
      <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
       type="text" placeholder="Name" value={name} onChange={handleNameChange} />
    <label className="block text-gray-700 font-bold mb-2" >Email</label>
      <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
       type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <label  className="block text-gray-700 font-bold mb-2" >Password</label>
      <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
       type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button type="submit" className='flex  bg-gray-300 text-black text-bold min-w-screen mt-2 px-2 py-2  justify-center items-center'>Register</button>
    </form>
    <div className='py-2 text-center text-gray-500'>Already have an account? <Link className='underline text-black' to="/login">Login</Link>
        </div>
    </div>
</div>
  );
}

export default Registration;

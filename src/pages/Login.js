import React, { useContext, useState } from 'react';
import axios from 'axios';
import {Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext';

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
const {setUser}=useContext(UserContext);
  async function handleSubmit(event) {
    event.preventDefault();
    const userData = {email,password}
    try{
       const response = await axios.post('http://localhost:5000/api/login', userData)
        setUser(response.data)
        // console.log(res.data);
        alert("Login Successful");
        // redirect user to home page
    setRedirect(true);

    
    }
      catch(err) {
        console.log(err);
        alert("Login Failed");

      };
  }

  if(redirect){
    return  <Navigate to={'/'} />
  } 

  return (

<div className="min-h-screen flex items-center justify-center bg-gray-200 sm:px-6 lg:px-8">      
    <div className="max-w-md w-full space-y-8">
        <div><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2></div>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" >Email</label> 
            <input type="email" placeholder="Email" value={email} 
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={handleEmailChange} />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" >
              Password
            </label> 
            <input
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            </div>

            <button className='flex text-center bg-gray-300 text-black text-bold min-w-screen mt-2 px-2 py-2  justify-center items-center' type="submit">Login</button>
            
          </form>
          <div className='py-2 text-center text-gray-500'>Don't have an account yet? <Link className='underline text-black' to="/register">Register Now</Link>
        </div>
    </div>
</div>
  );
}

export default Login;
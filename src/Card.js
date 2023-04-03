import React from 'react'
import { UserContext } from './UserContext';
import { useContext } from 'react';
const Card = () => {
const src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG90cmFpdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60"
const {user}=useContext(UserContext);


  return (
    <div className='bg-gray-300 rounded-md m-7 p-5 flex flex-col items-center'>

        <div>
          <img src={src}alt="Profile picture" className='rounded-full h-20 w-20 '/>
        </div>
        <div>Name   {user.name}</div>
        <div>Email   {user.email} </div>
        <div>Aadhar No.</div>
        <div>Edit  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"></path></svg></div> 
    </div>
  )
}

export default Card
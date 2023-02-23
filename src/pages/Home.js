import axios from 'axios';
import React, { useEffect,useState } from 'react'
import Places from './Places';

const Home = () => {

  const[places,setPlaces]=useState([]);
useEffect(()=>{

  axios.get('/places').then(response=>{
 
    setPlaces(response.data)
  });
},[]);

  return (
    <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {places.length>0 && places.map(place=>(
          <div>
           <div key={place.photos} className='bg-gray-500 rounded-2xl flex'>
            {place.photos?.[0] && (
              <img key={place.photos} className='rounded-2xl object-cover aspect-square' src={'http://localhost:5000/uploads/'+place.photos?.[0]} alt=""/>

            )}
            </div>
            <h3 className='font-bold'> {place.address}</h3>
            <h2 className='text-sm text-gray-500'>{place.title}</h2>  
            <div className='mt-1'>
              <span className='font-bold'> ₹{place.price} </span>per night
            </div>
           </div>

      ))}
    </div>
  )
}

export default Home

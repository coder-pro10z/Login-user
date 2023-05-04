import axios from 'axios';
import React, { useEffect,useState } from 'react'


// import Places from './Places';
import {Link} from 'react-router-dom'

const Home = () => {

  const[places,setPlaces]=useState([]);
useEffect(()=>{

  axios.get('/places').then(response=>{
 
    setPlaces(response.data)
  });
},[]);
// const index=0
              // index +=1;
  return (
  
    <>
    <div>
      <h1>Top Pick's</h1>

    </div>
    <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5  '>
      
     
      {places.length>0 && places.map(place=>(
          <Link to={'/place/'+place._id}>
            <div className='max-w-sm rounded-xl overflow-hidden shadow-lg'>
           <div key={place.photos} className='bg-gray-500 rounded-2xl flex'>
            {place.photos?.[0] && (
              <img key={place.photos} className='rounded-2xl object-cover aspect-square' src={'http://localhost:5000/uploads/'+place.photos?.[0]} alt=""/>
              )}
            </div>
            <h3 className='font-bold ml-2'> {place.address}</h3>
            <h2 className='text-sm text-gray-500 ml-2'>{place.title}</h2>  
            <div className='mt-1'>
              <span className='font-bold ml-2 '> ₹{place.price} </span>per night
            </div>
            </div>
           </Link>

      ))}
      </div>
      </>
    
    
  )
}

export default Home

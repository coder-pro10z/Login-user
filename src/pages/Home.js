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
    
     <div className='ml-20 mr-20 mt-12 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4   '>
      
     
      {places.length>0 && places.map(place=>(
        <Link to={'/place/'+place._id} >

          <div className='max-w-sm h-[100%] rounded-lg shadow-lg'>
           <div key={place.photos} className='rounded-t-md flex'>
            {place.photos?.[0] && (
              <img key={place.photos} className='rounded-t-md object-cover aspect-square ' src={'http://localhost:5000/uploads/'+place.photos?.[0]} alt=""/>
              )}
            </div>
            <h3 className='font-bold ml-2 min-h-20'> {place.address}</h3>
            <h2 className='text-sm text-gray-500 pl-2 p-1'>{place.title}</h2>  
            <div className='mt-1 pb-2 '>
              <span className='font-bold ml-2  '> ₹{place.price} </span>per night
            </div>
          
          </div>
        </Link>

      ))}
      </div>
      </>
    
    
  )
}

export default Home

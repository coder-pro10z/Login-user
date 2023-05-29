import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import search from '../icons/search.png'
import Pano from '../utils/View'
import Para from './Parallax';


const Home = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  

  useEffect(() => {
    axios.get(`/places?search=${searchTerm}`).then((response) => {
      setPlaces(response.data);
    });
  }, [searchTerm]);
 

  

  const handleSearch = () => {
    const results = places.filter((place) =>
      place.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };
 
  
  const displayPlaces = searchResults.length > 0 ? searchResults : places;

  return (
    <>
   
   {/* <div>
          <Para  />

   </div> */}
    <div className='bg-light' >
      <div className='ml-[12%] mr-[12%] bg-white  shadow-xl pl-[2%] pr-[2%] pt-[1.5%]'>
        
      
        <div className='flex  font-no ml-[19%] mr-[19%] transform transition duration-500 hover:translate-x-1.5 '>
          
          <input
            type='text'
            placeholder='Search your Destination...'
            className='pt-[2%]  
            shadow-lg rounded-lg w-full '
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <button
            className=' pl-[2.5%] pr-[2.5%] bg-blue-500 text-white rounded-full '
            onClick={handleSearch}
          >
            <img src={search} className='w-4' />
          </button>
        </div>

          <div className='mt-[2%]'> 
          <div className='grid gap-x-6 gap-y-14 grid-cols-2 md:grid-cols-3 lg:grid-cols-5  pb-[21%] '>
          
          {displayPlaces.map((place) => (
            <Link to={`/place/${place._id}`} key={place._id}>
              <div className='relative max-w-sm h-[107%] rounded-xl shadow-lg mb-1 hover:scale-105 transform transition duration-500 '>
                <div >

                <div className='rounded-t-xl  flex '>
                    {place.photos?.[0] && (
                      <img
                      className='rounded-xl object-cover aspect-square'
                      src={`http://localhost:5000/uploads/${place.photos?.[0]}`}
                      alt=''
                      />
                      )}
                  </div>
                  
                  <h3 className='font-no font-medium ml-2 min-h-20'>
                    {place.address}
                  </h3>
                  
                  <h2 className='text-sm font-no text-gray-500 pl-2 p-1'>
                    {place.title}
                  </h2>
            
                  <span className='font-no absolute bottom-0 left-0 ml-2  pt-2 pb-1'>
                    ₹{place.price} per night
                  </span>
              
                  </div>
              </div>
            </Link>
          ))}
        </div></div>
       
       

       
        </div>
      <div>
      </div>
          {/* <Pano/> */}

      </div>
    </>
  );
};

export default Home;
import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';

const Para =React.lazy(()=>import('./Parallax'))



const Home = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [slidePosition, setSlidePosition] = useState(0);
  const handleSlideChange = (position) => {
    setSlidePosition(position);
  };
  
  

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
   
   <div className='mt-[-2%] z-0'>
    <Suspense fallback={<div>Loading........</div>}>
    <Para  />
    </Suspense>
        

   </div>
   
    </>
  );
};

export default Home;
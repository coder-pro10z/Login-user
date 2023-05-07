import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
      <div className='ml-20 mr-20 mt-12'>
        <div className='flex mb-6 font-no '>
          <input
            type='text'
            placeholder='Search your Destination...'
            className='p-2 border border-gray-400 rounded-lg w-full'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg'
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className='grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-1'>
          {displayPlaces.map((place) => (
            <Link to={`/place/${place._id}`} key={place._id}>
              <div className='relative max-w-sm h-[107%] rounded-lg shadow-lg mb-2 '>
                <div>

                <div className='rounded-t-md flex'>
                    {place.photos?.[0] && (
                      <img
                      className='rounded-t-md object-cover aspect-square'
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
            
                  <span className='font-no absolute bottom-0 left-0 ml-2 pt-2 pb-1'>
                    ₹{place.price} per night
                  </span>
              
                  </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className='flex mb-6'>
      <input
        type='text'
        placeholder='Search by address...'
        className='p-2 border border-gray-400 rounded-lg w-full'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg transform transition duration:700 hover:scale-105 hover:bg-new hover:text-primary'
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;

import React from 'react'
import Search from './Search'


const SearchBar = () => {
  return (
    <div>
        
        <div className='flex gap-2.5 border border-gray-300 rounded-full px-2 py-2 shadow-md shadow-gray-300 '>
<button className='text-black bg-white'>Anywhere</button>
    
    {/* TO CREATE A VERTICAL LINE  */}
    <div className='border-l border-gray-300 '></div>
    <button className='text-black bg-white'>Any Week</button>
    <div className='border-l border-gray-300'></div>

    <button className='text-black bg-white'>Any Guest</button>
  <Search/>
    
  
</div >
        </div>
  )
}

export default SearchBar
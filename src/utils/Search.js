import React , {useState}from 'react'

const Search = () => {
    const [showSearchBox, setShowSearchBox] = useState(false);

    function handleSearchIconClick() {
      setShowSearchBox(true);
    }
  return (
    <div>
     <button onClick={handleSearchIconClick} className=' pr-10 pl-2 item-center text-black bg-white justify-center font-no'>  Search Your Destination . . .</button>
  <button onClick={handleSearchIconClick} className='text-white bg-primary p-1 rounded-full'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
    </button>
    
  <textarea
    className='w-40 h-8'
    style={{ display: showSearchBox ? 'block' : 'none' }}
  /></div>
  )
}

export default Search
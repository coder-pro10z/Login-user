import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'


const Header = () => {
  const { user } = useContext(UserContext)

  return (
    <div className='item-center bg-white pos-absolute z-10 p-[0.5%] border-b-2 rounded-b-xl shadow-xl'>
      <header className='flex space-between  justify-between pos-sticky pb-1'>
        <a href='/' className='flex item-center pt-2 gap-1 hover:translate-x-1 duration-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='solid'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-8'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
            />
          </svg>

          <span className='font-bold text-xl'>RentIt</span>
        </a>

        {/* SEARCHBAR */}
        {/* <SearchBar /> */}

        <Link
          to={user ? '/account' : '/login'}
          className='flex item-center  justify-center gap-2  pt-2 pl-2 pr-2 bg-white shadow-gray-400 rounded-full shadow-lg mr-4 hover:translate-x-0.5 duration-500'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6 flex justify-center'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
          </svg>

          <div className='text-white bg-gray-200 rounded-full border border-gray-500 overflow-hidden justify-center h-6'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6 relative'>
              <path
                fillRule='evenodd'
                d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
                clipRule='evenodd'
              />
            </svg>
          </div>

          {!!user && <div className='font-no flex justify-center '>{user.name}</div>}
        </Link>
      </header>
      
    </div>

  )
}

export default Header

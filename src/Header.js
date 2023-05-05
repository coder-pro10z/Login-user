import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'
import SearchBar from './SearchBar'
import Lottie from 'react-lottie';
import Dot from './icons/dots.json'

const Header = () => {

  const { user } = useContext(UserContext)
  const defaultOptions={
    loop:true,
    autoplay:true,
    animationData : Dot,
    rendererSettings:{
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (

    <div className=' border-b-2 rounded-2xl  '>
      
        <header className='flex p-1 space-between justify-between pos-sticky pb-4'>
          <a href='/' className='p-1.5 flex item-center gap-1 '>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>

            <span className='font-bold text-xl'>RentIt</span>
          </a>
          {/* SEARCHBAR */}
          <SearchBar/>
          

        <Link to={user ? "/account" : "/login"} className='flex item-center gap-2 border border-gray-300 rounded-full px-2 py-2 mr-4'>

          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg> */}
          <div className='flex justify-center px-1 '><Lottie options={defaultOptions} height={30} width={30}/></div>
             

          <div className='text-white bg-gray-500 rounded-full p-1 border border-gray-500 overflow-hidden  justify-center'>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>

          </div>
          {!!user && (

            <div>
              {user.name}
            </div>
          )}


        </Link>

      </header>
    </div>
  )
}

export default Header

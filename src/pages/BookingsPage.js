import React from 'react'
import AccountNav from './AccountNav'
import {useEffect,useState} from 'react'
import axios from 'axios'
import PlaceImg from '../utils/PlaceImg'
import {Link} from 'react-router-dom'
import BookingDates from '../utils/BookingDates'

const BookingsPage = () => {
    const [bookings,setBookings] = useState([])
    useEffect(()=>{
       axios.get('/bookings').then(response=>{
        setBookings(response.data)
       }) 
    },[])
  return (
    <div>
      <div className='shadow-lg rounded-2xl ml-[29%] mr-[29%] mt-[1%]'>  <AccountNav/> </div>
     
      
      <div className='font-no shadow-lg ml-[16%] mr-[16%] p-[1%] '>
      <div className='font-no flex justify-center text-3xl font-medium'>
      Your Bookings:
      </div>
        
        {bookings?.length > 0 && bookings.map(booking => (
            <Link to= {'/account/bookings/'+booking._id} className='flex gap-4 m-4 shadow-lg p-[0.5%] rounded-2xl overflow-hidden transform transition duration:1000 hover:scale-105 '>
                <div className='rounded-2xl '>
                    <PlaceImg place={booking.place}/>
                </div>
                
                <br/>
                
                
                <div className='py-3 pr-3 grow'>
                        <h2 className='text-xl'>{booking.place.title}</h2>
                        <div className='flex gap-2 item-center border-t border-gray-300 mt-2 py-2'>
                
                </div>

                    <BookingDates booking={booking} className="mb-1 mt-2 text-gray-500"/>
                    <div className='flex gap-1 text-xl p-2'>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    Total price : ₹{booking.price}
                    </div>
                    

            </div>
        </Link>
        ) )}


      </div>
    </div>
  )
}

export default BookingsPage

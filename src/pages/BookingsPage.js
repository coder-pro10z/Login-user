import React from 'react'
import AccountNav from './AccountNav'
import {useEffect,useState} from 'react'
import axios from 'axios'
import PlaceImg from '../PlaceImg'
import {format} from 'date-fns'
import {Link} from 'react-router-dom'
import {differenceInCalendarDays} from 'date-fns'
import BookingDates from '../BookingDates'
const BookingsPage = () => {
    const [bookings,setBookings] = useState([])
    useEffect(()=>{
       axios.get('/bookings').then(response=>{
        setBookings(response.data)
       }) 
    },[])
  return (
    <div>
      <AccountNav/>
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
            <Link to= {'/account/bookings/'+booking._id} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
                <div className='w-48'>
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
                    Total price : ${booking.price}
                    </div>

            </div>
        </Link>
        ) )}


      </div>
    </div>
  )
}

export default BookingsPage

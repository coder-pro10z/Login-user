//this page is to be display on the new bookingspage section

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import AddressLink from '../utils/AddressLink'
import PlaceGallery from '../utils/PlaceGallery'
import BookingDates from '../utils/BookingDates'
import MetaMask from '../utils/MetaMask'
import StripeCheckout from 'react-stripe-checkout';

const BookingPage = () => {
  const { id } = useParams()
  const [booking, setBooking] = useState(null)
  
  
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({ _id }) => _id === id)

        if (foundBooking) {
          setBooking(foundBooking)
        }

      })
    }
  }, [id])

  if (!booking) return ''

  return (
    <div className='my-8 font-no shadow-2xl ml-[10%] mr-[10%] pl-[3%] pr-[3%] pt-[1%] pb-[1%]'>
      {/* single booking : {id} */}
      <h1 className='text-3xl pl-[5.9%]'>{booking.place.title}</h1>
      <div className='pl-[4.5%] pt-[1%]'>
      <AddressLink className='my-2 block '>{booking.place.address}</ AddressLink>
      </div>
      
      <div className='flex'>
      <div className='shadow-md p-6 my-6 rounded-2xl flex items-center justify-between max-w-xl overflow-hidden shadow-2xl ml-[5.9%]'>
        <div >
          <h2 className='text-xl mb-4  '>Your booking information :</h2>
          <BookingDates booking={booking}></BookingDates>
        </div>
      
      </div>
      <div className='bg-primary p-[2%] text-white rounded-2xl shadow-xl  '>
          <div className='flex justify-center'>
            Total Price
          </div>

          {/* <div className='text-2xl' id='price'>
            ₹ {booking.price}
          </div> */}
  {/* <div className='text-2xl' id='price'>
  ₹ {booking.price}
  <StripeCheckout
    amount={booking.price * 100}
    currency="INR"
    stripeKey="pk_test_51MqgBHSEV1mMy0RjXJqoHnqWdBDTheCr0J8zM4sUXoSETH7Xm8Ie06wcbjgbVdMGUILZgwfRxKsfhnPBz2AlFBi900406qyH3Z"
    name={booking.place.title}
    description="Booking Payment"
    token={(token) => {
      console.log(token);
      axios.post('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          booking,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // Handle success or error
        })
        .catch((error) => console.error(error));
    }}
    email={booking.user.email}
  />
</div> */}
<div className='text-md font-no' id='price'>
  <div className='flex justify-center'> ₹ {booking.price} </div>
  
  <StripeCheckout
   
    amount={booking.price * 100}
    currency="INR"
    stripeKey="pk_test_51MqgBHSEV1mMy0RjXJqoHnqWdBDTheCr0J8zM4sUXoSETH7Xm8Ie06wcbjgbVdMGUILZgwfRxKsfhnPBz2AlFBi900406qyH3Z"
    name={booking.place.title}
    description="Booking Payment"
    token={(token) => {
      console.log(token);
      axios.post('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          booking,
          unit_amount: booking.price * 100,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // Handle success or error
        })
        .catch((error) => console.error(error));
    }}
    email={booking.user.email}
  />
</div>

        </div>
      </div>
      <MetaMask />
      <PlaceGallery place={booking.place}></PlaceGallery>

    </div>
  )
}

export default BookingPage

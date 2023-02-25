import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns';
  
  import React, { useEffect,useContext,useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const BookingWidget = ({place}) => {
  const[checkIn,setCheckIn] = useState('');
  const[checkOut,setCheckOut] = useState('');
  const[numberOfGuests,setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setphone] = useState('');
  const [redirect,setRedirect] =useState('');
  const {user} = useContext(UserContext);

  useEffect(()=>{
    if(user){
        setName(user.name)
    }
  },[user])

  let numberOfNights=0;
  if(checkIn && checkOut){

    numberOfNights=differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
  }


  async function bookThisPlace() {

    const response =  await axios.post('/bookings',{
      checkIn,checkOut,numberOfGuests,name,phone,
      place:place._id,
      price:numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect('/account/bookings/'+bookingId);
  }

  if(redirect){
    return <Navigate to ={redirect} />
  }

  return (
    <div>
      <div className='bg-white shadow shadow-md shadow-gray-500 p-4 rounded 2-xl'>
            <div className='text-2xl text-center'>
              Price : ${place.price} per night
              </div>

              <div className='border rounded-2xl mt-4 mb-4'>
            <div className='flex'>

            <div className=' py-3 px-4 border-r'>
              <label>Check In: </label>
              <input type='date' 
              value={checkIn} 
              onChange={ev => setCheckIn(ev.target.value)}></input>
            </div>
            <div className=' py-3 px-4 '>
              <label>Check Out: </label>
              <input type='date' 
              value={checkOut} 
              onChange={ev => setCheckOut(ev.target.value)}></input>
            </div>
            </div>
            <div className=' py-3 px-4 border-t'>
              <label>Number of Guests :</label>
              <input className='rounded-xl p-1 border border-gray-500 bg-white text-black' type='number' 
              value={numberOfGuests} 
              onChange={ev => setNumberOfGuests(ev.target.value)}></input>
            </div>

            {numberOfNights >0 && (
               <div className=' py-3 px-4 border-t'>
               <label>Your full Name:</label>
               <input type='text' 
               value={name} 
               onChange={ev => setName(ev.target.value)}></input>
               
               <label>phone Number:</label>
               <input type='tel' 
               value={phone} 
               onChange={ev => setphone(ev.target.value)}></input>
             </div>
            )}

              </div>
            <button onClick={bookThisPlace} className='primary' >
              Book this place 
              {numberOfNights>0 && (
                <span> ${numberOfNights * place.price}</span>
              )}
              </button>


          </div>
    </div>
  )
}

export default BookingWidget

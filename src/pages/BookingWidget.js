import React from 'react'

const BookingWidget = (place) => {
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
              <input type='date'></input>
            </div>
            <div className=' py-3 px-4 '>
              <label>Check Out: </label>
              <input type='date'></input>
            </div>
            </div>
            <div className=' py-3 px-4 border-t'>
              <label>Number of Guests :</label>
              <input className='rounded-xl p-1 border border-gray-500 bg-white text-black' type='number' value={1}></input>
            </div>

              </div>
            <button className='primary' >Book this place</button>


          </div>
    </div>
  )
}

export default BookingWidget

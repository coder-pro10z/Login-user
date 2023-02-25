import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import AddressLink from '../AddressLink'
import PlaceGallery from '../PlaceGallery'
import BookingWidget from './BookingWidget'

const PlacePage = () => {
    const {id}=useParams()
    const [place,setPlace]=useState(null)

    useEffect(()=>{
      if(!id)
      {return;}
      axios.get('/places/'+id).then(response=>{
      setPlace(response.data)
      })
    },[id])

    if(!place) return '';

 

    return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
      {/* Place page:{id} */}
      <h1 className='mt-4 text-3xl bg-gray-100 -mx-8 px-8 py-4 '>{place.title}</h1>
      <AddressLink >{place.address}
     </AddressLink >
      <PlaceGallery place={place}/>

      <div className='mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
      <div>
        <div className='my-4'>
          <h2 className='font-semibold text-2xl'>Description</h2>
          {place.description}
        </div>
          {/* <h2 className='font-semibold text-2xl'>CHeck</h2> */}
      
      
        <b>Check In : {place.checkIn}</b><br/>
        <b>Check Out : {place.checkOut}</b><br/>
      Max number of guests : {place.maxGuests}<br/>
      {/* {place.description} */}
      </div>
      

        <div>
          <BookingWidget place={place}/>
        </div>
      </div>

            <div className='bg-white -mx-8 px-8 py-4 mt-8 border-t'>

      <div ><h2 className='font-semibold text-2xl'>Extra info</h2></div>
      <div className='text-sm text-gray-700 leading-4 mb-4 mt-2'>{place.extraInfo}</div>
            </div>
      

  </div>
  )
}

export default PlacePage

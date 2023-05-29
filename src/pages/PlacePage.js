import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import AddressLink from '../utils/AddressLink'
import PlaceGallery from '../utils/PlaceGallery'
import BookingWidget from './BookingWidget'
import ShareButton from '../utils/Share'
// import Pano from '../utils/View'



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
    <div className='ml-[11%] mr-[11%] shadow-2xl mt-1  -mx-8 px-8 pt-4 '>
      {/* Place page:{id} */}
      <h1 className='mt-4 text-3xl  font-no mx-8 px-8 py-4 '>{place.title}</h1>
      
     <div className='flex justify-between p-3 ml-[3.2%] mr-[10%] '>
      <div className='hover:scale-110 duration-700'>
      <AddressLink  >{place.address} 
     </AddressLink >
      </div>
      
      {/* {place.owner}<br/> */}
      {/* {place.ownerEmail}<br/> */}
      {/* {place.ownerphone} */}


     {/* <button> <View/> </button> */}
     
      <ShareButton />
      
     
      </div>
      
      <PlaceGallery place={place}/>

      <div className='mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>

        
      <div>
        <div className='my-4'>
          <hr />
          <br />
          <h2 className='font-medium font-no text-2xl'>Description</h2>
          <br />
          <div className='font-no font-normal'>
          {place.description}
          </div>
          
        </div>
        {place.ownerEmail && place.ownerPhone ? (
  <div>
    <h2 className="font-medium font-no text-2xl">Contact Details</h2>
    <p>{place.owner}</p>
    <p>{place.ownerEmail}</p>
    <p>{place.ownerPhone}</p>
  </div>
) : null}

          {/* <h2 className='font-semibold text-2xl'>CHeck</h2> */}
      <hr />
      <br />
        <b className='font-no font-medium'>Check In : {place.checkIn}</b><br/>
        <b className='font-no font-medium' >Check Out : {place.checkOut}</b><br/>
     <b className='font-no font-medium' >Max number of guests : {place.maxGuests}<br/></b> 
      {/* {place.description} */}
      </div>
      

        <div>
          <BookingWidget place={place}/>
        </div>
      </div>

            <div className='bg-white -mx-8 px-8 py-4 mt-8 border-t'>

      <div ><h2 className='font-medium font-no text-2xl'>Extra info</h2></div>
      <div className='text-sm text-gray-700 font-no leading-4 mb-4 mt-2'>{place.extraInfo}</div>
            </div>
      
            <div >
        {/* <Pano/> */}
      </div>

  </div>
  )
}

export default PlacePage

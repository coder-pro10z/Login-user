import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import BookingWidget from './BookingWidget'

const PlacePage = () => {
    const {id}=useParams()
    const [place,setPlace]=useState(null)
    const [showAllPhotos,setShowAllPhotos]=useState(false)

    useEffect(()=>{
      if(!id)
      {return;}
      axios.get('/places/'+id).then(response=>{
      setPlace(response.data)
      })
    },[id])

    if(!place) return '';

    if(showAllPhotos){
      return(
      <div className='absolute inset-0 bg-black text-white min-h-screen '>

        <div className='bg-black p-8 grid gap-4'>
        
        <h2 className='mr-48 text-3xl'>Photos of {place.title}</h2>

        <button onClick={()=>setShowAllPhotos(false)} className=' fixed text-black right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl  ml-2 shadow shadow-md shadow-gray-700'>
          Close photos 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
          
        {place?.photos?.length > 0 && place.photos.map(photo =>(
          <div className='min-w-full min-h-screen'>
          <img src={'http://localhost:5000/uploads/'+photo}></img>
          </div>
        ))}
        </div>
      </div>
      )
    }

    return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
      {/* Place page:{id} */}
      <h1 className='mt-4 text-3xl bg-gray-100 -mx-8 px-8 py-4 '>{place.title}</h1>
      <a className='felx gap-1 my-3 my-2 block font-semibold underline' target='_blank' href={'https://maps.google.com/?q='+place.address}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>

        {place.address}
        </a>
      
      <div className='relative'>
      <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
        <div className='aspect-square object-cover'>
          {place.photos?.[0] && (
          <div>
            <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={'http://localhost:5000/uploads/'+place.photos[0]}></img>
          </div>
            )}
          </div>
        
        <div className='grid'>{place.photos?.[1] && (<img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={'http://localhost:5000/uploads/'+place.photos[0]}></img>)}
            <div className='overflow-hidden'>
              {place.photos?.[2] && (<img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover relative top-2 ' src={'http://localhost:5000/uploads/'+place.photos[0]}></img>)}
            </div>

            <button onClick={()=>setShowAllPhotos(true)} className='flex gap-1 absolute bottom-2 right-2 py-2 px-2 bg-white rounded-2xl shawdow shadow-md shadow-gray-500 text-black'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

        Show more photos
        </button>  
        </div>
      </div>
    </div>
      

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

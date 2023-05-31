import React from 'react'
import {useState} from 'react'

const PlaceGallery = ({place}) => {

    const [showAllPhotos,setShowAllPhotos]=useState(false)


    if(showAllPhotos){
        return(
        <div className='mt-[3%] absolute inset-0 font-no  text-black min-h-screen '>
  
          <div className=' backdrop-blur-lg	 p-12 grid gap-4'>
          
          <h2 className=' flex justify-center p-1 mb-5 text-2xl'>Photos of {place.title}</h2>
  
          <button onClick={()=>setShowAllPhotos(false)} className=' fixed text-black right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl  ml-2 shadow shadow-md shadow-gray-400 hover:scale-95 transform duration-500  '>
            Close photos 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
            
          {place?.photos?.length > 0 && place.photos.map(photo =>(
            <div className=' flex justify-center max-w-full max-h-screen'>
            <img className='rounded-2xl hover:scale-110 duration-500' src={'http://localhost:5000/uploads/'+photo} alt=''></img>
            </div>
          ))}
          </div>
        </div>
        )
      }

  return (
    <div>
      <div className='relative'>
        <div className=' flex justify-center pl-[5%] pr-[5%] w-[94%]'> 
      <div className='grid gap-2 grid-cols-[2fr_1fr] hover:scale-105 duration-500 translate-x-1.5 rounded-3xl overflow-hidden'>
        <div className='aspect-square object-cover   '>
          {place.photos?.[0] && (
          <div>
            <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square min-w-full object-cover' alt='' src={'http://localhost:5000/uploads/'+place.photos[0]}></img>
          </div>
            )}
          </div>
        
        <div className='grid'>{place.photos?.[1] && (<img onClick={()=> setShowAllPhotos(true)} alt='' className='cursor-pointer aspect-square object-cover min-h-[100%]' src={'http://localhost:5000/uploads/'+place.photos[1]}></img>)}
            <div className='overflow-hidden'>
              {place.photos?.[2] && (<img onClick={()=> setShowAllPhotos(true)} alt='' className='cursor-pointer aspect-square object-cover relative top-2  min-h-[100%] ' src={'http://localhost:5000/uploads/'+place.photos[2]}></img>)}
            </div>

            <button onClick={()=>setShowAllPhotos(true)} className='flex gap-1 absolute mr-[12%] bottom-2 right-2 py-2 px-2 bg-white rounded-2xl shawdow shadow-md shadow-gray-500 text-black hover:scale-105 transform  duration-500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

        Show more photos
        </button> 
        </div> 
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default PlaceGallery

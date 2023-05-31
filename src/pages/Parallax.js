
import axios from 'axios';
import React, { useEffect, useState , Suspense } from 'react';
import bg from '../img/background.png'
import { Link } from 'react-router-dom';
import search from '../icons/search.png'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import '../pages/Parallax.css'
import { gsap } from 'gsap';

const Para = () => {
       const [places, setPlaces] = useState([]);
       const [searchTerm, setSearchTerm] = useState('');
       const [searchResults, setSearchResults] = useState([]);
       
       
       
     
       useEffect(() => {
         axios.get(`/places?search=${searchTerm}`).then((response) => {
           setPlaces(response.data);

          //  gsap.from('.animation_layer', {
          //   duration: 1,
          //   y: 100,
          //   opacity: 0,
          //   stagger: 0.2,
            
          // });
          
         });
       }, [searchTerm]);
      
     
       
     
       const handleSearch = () => {
         const results = places.filter((place) =>
           place.address.toLowerCase().includes(searchTerm.toLowerCase())
         );
         setSearchResults(results);
       };
      
       
       const displayPlaces = searchResults.length > 0 ? searchResults : places;
  return (
  
    <Parallax className='animation' pages={3} >
      <ParallaxLayer className='bg-img' offset={0} speed={0.6}style={{
        backgroundImage:`url(${bg})`,
        backgroundSize: 'cover',

      }}>
             <div className='animation_layer parallax mt-[40%]' ></div>
      </ParallaxLayer>
      <ParallaxLayer  factor={2} offset={0} speed={1.6}>
             <h3 className='head1'>Hi There</h3>
             
      </ParallaxLayer>
      
      <ParallaxLayer offset={0} speed={0.2}>
             <div className='animation_layer parallax' id='fog1'></div>
      </ParallaxLayer>
      
      <ParallaxLayer offset={0} speed={0.2}>
             <div className='animation_layer parallax' id='fog6'></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.3}>
             <div className='animation_layer parallax' id='fog7'></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.9} factor={0}>
        
             <div className='animation_layer parallax' id='mountain1'></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.3} factor={0.2}>
             <div className='animation_layer parallax' id='mountain2'></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.39} factor={0}>
             <div className='animation_layer parallax' id='mountain3'></div>
      </ParallaxLayer>
      <ParallaxLayer className='text-animation1' factor={1} offset={0} speed={2}>
             <h2>Search for the Destination</h2>
      </ParallaxLayer>
     
      <ParallaxLayer offset={0} speed={0.4} factor={0}>
             <div className='animation_layer parallax' id='mountain7'></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.6} factor={0}>
             <div className='animation_layer parallax' id='mountain8'></div>
      </ParallaxLayer>
      <Suspense fallback={<div>Loading........</div>}>

      <ParallaxLayer offset={0.85} factor={1} speed={0.7}>
     
     <div  >
       <div className='ml-[12%] mr-[12%] bg-white  shadow-xl pl-[2%] pr-[2%] pt-[1.5%] rounded-2xl'>
         
       
         <div className='flex rounded-xl font-no ml-[19%] mr-[19%] transform transition duration-500 hover:translate-x-1.5 '>
           
           <input
             type='text'
             placeholder='Search your Destination...'
             className='pt-[2%]  
             shadow-lg rounded-lg w-full '
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
           
           <button
             className=' ml-[-2.5%] px-[2%] py-[2%] bg-blue-500 text-white rounded-full '
             onClick={handleSearch}
           >
             <img src={search} className='w-4' />
           </button>
           
         </div>
 
           <div className='mt-[2%] '> 
           <div className='grid gap-x-6 gap-y-14 grid-cols-2 md:grid-cols-3 lg:grid-cols-5  pb-[21%] '>
           
           {displayPlaces.map((place) => (
             <Link to={`/place/${place._id}`} key={place._id}>
               <div className='relative max-w-sm h-[107%] rounded-xl shadow-lg mb-1 hover:scale-105 transform transition duration-500 '>
                 <div >
 
                 <div className='rounded-t-xl  flex '>
                     {place.photos?.[0] && (
                       <img
                       className='rounded-xl object-cover aspect-square'
                       src={`http://localhost:5000/uploads/${place.photos?.[0]}`}
                       alt=''
                       />
                       )}
                   </div>
                   
                   <h3 className='font-no font-medium ml-2 min-h-20'>
                     {place.address}
                   </h3>
                   
                   <h2 className='text-sm font-no text-gray-500 pl-2 p-1'>
                     {place.title}
                   </h2>
             
                   <span className='font-no absolute bottom-0 left-0 ml-2  pt-2 pb-1'>
                     ₹{place.price} per night
                   </span>
               
                   </div>
               </div>
             </Link>
           ))}
         </div></div>
        
        
 
        
         </div>
       <div>
       </div>
           {/* <Pano/> */}
 
       </div>
     </ParallaxLayer>

      </Suspense>
   
    </Parallax>

  )
}

export default Para
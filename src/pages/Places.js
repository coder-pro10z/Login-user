import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import axios from "axios"
import {useEffect, useState } from "react";
import PlaceImg from "../utils/PlaceImg";

export default function Places() {

    const [places,setPlaces] = useState([]);
    useEffect(() => {
      axios.get('/user-places')
      .then(({data})=>{
        setPlaces(data)
      })

    }, [])

    const handleDelete = (id) => {
        axios.delete(`/places/${id}`)
          .then(({ data }) => {
            setPlaces(places.filter(place => place._id !== data._id));
            window.location.reload(false);
            alert("Deleted Successful");
          })
          .catch(err => console.error(err));
      };

 return (

        <div>
            <div className='shadow-lg rounded-2xl ml-[29%] mr-[29%] mt-[1%]'>  <AccountNav/> </div>
           
                <div className="text-center cursor-pointer">
                    List of all Added Places 
                    <br/>
                    <br/>
                    <Link className=" inline-flex gap-1 bg-primary text-white px-4 py-2 rounded-full  " to={'/account/places/new'}>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add New Place
                    </Link>
                </div>
            
                <div className="mt-4 mr-20 ml-20 ">
                    {places.length> 0 && places.map(place =>(
                      
                      <div className="m-4 flex flex-col  p-4 rounded-2xl" key={place._id}>
                        <Link to ={'/account/places/'+place._id} className="flex cursor-pointer gap-4 shadow-2xl bg-gray-50 p-4 rounded-2xl" key={place._id}>
                            <div className="flex w-32 h-32 aspect-square object-cover bg-gray-300 grow shrink-0">
                               
                               {/* <div> */}
                                {/* <img key={place.photos} className='rounded-2xl object-cover aspect-square' src={'http://localhost:5000/uploads/'+place.photos?.[0]} alt=""/> } */}
                             <PlaceImg place={place}/>
                               {/* </div> */}

                            </div>
                            <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                            </div>
                        </Link>
                        <div className="flex justify-end">

                        <button className="flex  text-center bg-red-500 w-20 text-white px-4 py-2 rounded mt-2 transform transition duration:700 hover:scale-105 hover:bg-three hover:text-primary" onClick={()=>handleDelete(place._id)}>Delete</button>

                        </div>
                            
                        </div>

                    ))}
                </div>

           

        </div>

    )
}

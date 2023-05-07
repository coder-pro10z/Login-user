import React from 'react'
export default function PlaceImg({place, index=0, className}){
if(!place.photos?.length){
return '';
}
if(!className){
    className='object-cover w-32 h-32 shrink-0';
}


    return(
        <img className={className} src={'http://localhost:5000/uploads/'+place.photos[index]} alt=""/>

    );
}
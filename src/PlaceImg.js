import React from 'react'
export default function PlaceImg({place, index=0, className}){
if(!place.photos?.length){
return '';
}
if(!className){
    className='object-cover';
}


    return(
        <img className={className} src={'http://localhost:5000/uploads/'+place.photos[index]} alt=""/>

    );
}
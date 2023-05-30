import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../icons/share.json'

function ShareButton() {
  const share = async () => {
    try {
      await navigator.share({
        title: 'view this',
        text: 'this house',
        url: 'https://www.example.com',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  const defaultOptions={
    loop:true,
    autoplay:true,
    animationData : animationData,
    rendererSettings:{
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <button className='rounded-full p-1 bg-white box-border hover:translate-x-1 duration-500 'onClick={share}>
        <Lottie options={defaultOptions} height={50}/>
      
    </button>
  );
}

export default ShareButton;

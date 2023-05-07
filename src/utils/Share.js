import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../icons/share.json'

function ShareButton() {
  const share = async () => {
    try {
      await navigator.share({
        title: 'Example Title',
        text: 'Example Text',
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
    <button className='rounded-full p-1 bg-white box-border 'onClick={share}>
        <Lottie options={defaultOptions} height={40}/>
      
    </button>
  );
}

export default ShareButton;

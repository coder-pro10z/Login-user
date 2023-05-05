import React from 'react';

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

  return (
    <button className='rounded p-1 bg-primary 'onClick={share}>
        
      Share
    </button>
  );
}

export default ShareButton;

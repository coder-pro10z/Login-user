import React, { useEffect, useRef, useState } from 'react';
import * as PANOLENS from 'panolens';

const Pano = () => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [displayed, setDisplayed]=useState(false);
 


  useEffect(() => {
   
     viewerRef.current = new PANOLENS.Viewer({
      container: containerRef.current,
      autoRotate: true,
      autoRotateSpeed: 1

    });


    return () => {
      viewerRef.current.destroy();
    };
  }, []);
  const handleDisplayClick = async () => {
    if(viewerRef.current){
      viewerRef.current.getScene().children.length = 0;

      const panorama = new PANOLENS.ImagePanorama('/pano.jpg');
      await panorama.addEventListener('load',()=>{
      
        viewerRef.current.add(panorama);
        setDisplayed(true);
      });
      viewerRef.current.add(panorama);
    }
    // const viewer = new PANOLENS.Viewer({
    //   container: containerRef.current
    // });

    // viewer.add(new PANOLENS.ImagePanorama('/assets/pano2.png'));
  };

  return (
    <div>
    <button onClick={handleDisplayClick}>Display</button>
    {displayed && (
      <div id="coucou" style={{ height: '500px', // Set the desired height
          width: '100%', // Set the desired width
          position: 'relative'  }} ref={containerRef}>
      <p>Coucou</p>
    </div>

    )}
    
    </div>
  );
};

export default Pano;

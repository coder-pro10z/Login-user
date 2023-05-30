import React, { useState } from 'react'
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';


const GoogleAuth = () => {
    
    const cliedtId="761436610898-77uigb3sm4bjar7q9siedm247v89gc4m.apps.googleusercontent.com"
    const [redirect, setRedirect]= useState();
    const handleGoogleSuccess = async (response) => {
        const { tokenId } = response;
        try {
          // Send the token to your backend for verification and user creation
          const res = await axios.post('/api/google-signup', { tokenId });
          console.log(res.data);
          // Redirect user to desired page after successful sign-up
          setRedirect(true);
        } catch (error) {
          console.log(error);
        }
      };
      
      const handleGoogleFailure = (error) => {
        console.log(error);
        // Handle any error during Google sign-up
      };
      
  return (
    <div>Testing
        <GoogleLogin
  clientId="761436610898-77uigb3sm4bjar7q9siedm247v89gc4m.apps.googleusercontent.com"
  buttonText="Sign up with Google"
  onSuccess={handleGoogleSuccess}
  onFailure={handleGoogleFailure}
  cookiePolicy={'single_host_origin'}
  isSignedIn={true}
/>

    </div>
  )
}

export default GoogleAuth
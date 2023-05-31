import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link,Navigate,useParams } from 'react-router-dom';
import Signup from '../icons/Signup.json'
import Lottie from 'react-lottie';
// import PhotoUploader from "../utils/PhotoUploader";
import GoogleAuth from '../utils/GoogleAuth';
import { gapi } from 'gapi-script';


function Registration() {
  const {id} = useParams()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(false);
  const [uid, setUid] = useState('');
  const [uidValid, setUidValid] = useState(false);
  const [profilePic, setProfilePic] = useState([]);
  const [redirect,setRedirect] = useState(false);
  const[passwordError, setPasswordError]=useState('');
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{8,})/;
  

//   axios.get('/users/' + id).then(response => { setProfilePic(data.profilePic) })
// },[id])
  //regex for for phone number validation
  const phoneRegex = /^\d{10}$/;
  const validatePhone = (phoneNumber) => {
    return phoneRegex.test(phoneNumber);
  };
  const cliedtId="761436610898-77uigb3sm4bjar7q9siedm247v89gc4m.apps.googleusercontent.com"

  //regex for aadhar no. validation
  const uidRegex = /^[1-9][0-9]{11}$/;
  const validateUid = (uid) => {
    return uidRegex.test(uid);
  };


  const handleNameChange = event => {
    setName(event.target.value);
  }

  const handleEmailChange = event => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = event => {
    const newPassword=event.target.value;
    
    
    setPassword(newPassword);
    setPasswordError(passwordRegex.test(newPassword) ? '' : 'Password must of 8 letters Abc@123');
    
  }

  // const handlePhoneChange = event => {
  //   setPhone(event.target.value);
  // } 
  const handlePhoneChange = (event) => {
    const phoneNumber = event.target.value;
    const isValid = validatePhone(phoneNumber);
    setPhone(phoneNumber);
    setPhoneValid(isValid);
    
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (!phoneValid) {
  //     alert('Please enter a valid phone number.');
  //     return;
  //   }


  // const handleUidChange = event => {
  //   setUid(event.target.value);
  // } 
  const handleUidChange = event => {
    const uidNumber = event.target.value;
    const isValid = validateUid(uidNumber);
    setUid(uidNumber);
    setUidValid(isValid);
  };

  // const handleProfilePicChange = event => {
  //   setProfilePic(event.target.files[0]);
  // };
  useEffect(() => {
    axios.get('/users/' + id).then(response => {
      setProfilePic(response.data.profilePic);
    }).catch(err => {
      console.log(err);
    });
  }, [id]);
  useEffect(()=>{
 function start(){
  gapi.client.init({
    clientId:cliedtId,
    scope:""
  })
 };
 gapi.load('client:auth2',start);
  });

  const defaultOptions={
    loop:true,
    autoplay:true,
    animationData : Signup,
    rendererSettings:{
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!phoneValid) {
      alert('Please enter a valid phone number.');
      return;}

    const userData = {
      name,
      email,
      password,
      phone,
      uid,
      profilePic
    }
    
    await axios.post('http://localhost:5000/api/register', userData)
    .then(res => {
      console.log(res.data);
      // redirect user to login page
      alert("Registration Successful");
      // redirect user to home page
      setRedirect(true);
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  if(redirect){
    return  <Navigate to={'/login'} />
  } 
  return (
<div className=" flex  items-center font-no justify-center sm:px-5 lg:px-7"> 
<div className='shadow-lg w-[70%] flex justify-center  p-4 ' >
<div className='m-3 pt-[25%]'>
<Lottie options={defaultOptions} height={300} width={300}/>
</div>    
       
    <div className="max-w-md w-full space-y-8 ">
        <div><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900"> Register your account</h2></div>
        

       
      
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      
    <label className="block text-gray-700 font-bold mb-2" >Username</label>
        <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        type="text" placeholder="Name" value={name} onChange={handleNameChange} />
    <label className="block text-gray-700 font-bold mb-2" >Email</label>
        <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <label  className="block text-gray-700 font-bold mb-2" >Password</label>
        <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
     <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
        <input
        
          className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
            phoneValid ? 'border-green-500' : 'border-red-500'
          } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
          
          
          type="number"
          placeholder="XXXXX-XXXXX"
          value={phone}
          onChange={handlePhoneChange}
        />
        {!phoneValid && (
          <p  className="text-red-500 text-xs italic">Please enter a valid 10-digit phone number.</p>
        )}
     <label className="block text-gray-700 font-bold mb-2" >Aadhar Number</label>
        <input 
        maxLength={12}
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
        uidValid ? 'border-green-500' : 'border-red-500'
        } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
        type="text"
        placeholder="XXXX-XXXX-XXXX"
        value={uid}
        onChange={handleUidChange}
        />
        {!uidValid && (
          <p className="text-red-500 text-xs italic">Please enter a valid 12-digit Aadhaar number.</p>
        )}

      {/* <label className="block text-gray-700 font-bold mb-2">Profile Picture</label> */}
      {/* <PhotoUploader profilePic={profilePic} onChange={setProfilePic}/> */}
        <button type="submit" className='flex bg-primary rounded-xl text-white text-black text-bold  mt-2 px-[2%] py-2  justify-center items-center transform transition duration:700 hover:scale-105 hover:bg-three hover:text-primary'>Register</button>
        
    </form>
   
    <div className='py-2 text-center text-gray-500'>Already have an account? <Link className='underline text-black' to="/login">Login</Link>
    <div className='mr-[2%]'>
      <GoogleAuth/>
    </div>
        </div>
    </div>
    </div> 
</div>
  );
}

export default Registration;

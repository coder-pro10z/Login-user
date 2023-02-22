import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import React from 'react';
import axios from 'axios';
import './index.css'
import Layout from './Layout'
import { UserContextProvider } from './UserContext';

import Profile from './pages/Profile';
import Places from './pages/Places';
import PlacesForm from './pages/PlacesForm';

axios.defaults.baseURL='http://localhost:5000'
axios.defaults.withCredentials=true;
function App() {
  return (
    // <div className="App">

      <UserContextProvider>
     <BrowserRouter>
      <Routes> 
      <Route path="/" element={<Layout/>}>

        <Route index element={<Home/>} /> 
        <Route path='/login' element={<Login/>} /> 
        <Route path='/register' element={<Registration/>} /> 
        <Route path='/account' element={<Profile/>} />
        <Route path='/account/places' element= 
         {<Places/>} /> 
         <Route path='/account/places/new' element= 
         {<PlacesForm/>} /> 
        {/* <Route path='/account/bookings' element={<AccountPage/>} /> 
        <Route path='/account/places' element={<AccountPage/>} />  */}
         <Route path='/account/places/:id' element= {<PlacesForm/>} />
          
      </Route>
      </Routes>
     </BrowserRouter>
      </UserContextProvider>

  );
}

export default App;

import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import React from 'react';
import axios from 'axios';
axios.defaults.baseURL='http://localhost:5000'
axios.defaults.withCredentials=true;
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes> 
        <Route index element={<Home/>} /> 
        <Route path='/login' element={<Login/>} /> 
        <Route path='/register' element={<Registration/>} /> 

          

      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

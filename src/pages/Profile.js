import { useContext,useState } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import { UserContext } from "../UserContext";
import Places from "./Places";
import AccountNav from "./AccountNav";
import axios from 'axios';
import Card from "../Card";


export default function Profile(){
    const [redirect,setRedirect]=useState(null);
    const {ready,user,setUser}=useContext(UserContext);
    // const
    let {subpage} = useParams();
    if(subpage===undefined){
        subpage='profile';
    }
    // console.log(subpage);

    async function logout(){
        await axios.post('/logout');
        setRedirect('/')
        setUser(null);
    }


    if(!user && !ready){
        return 'Loading...';
    }

    if (ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }
    
    //to navigate after logging out 
    if(redirect){
        return <Navigate to={redirect}/>
    }


 return(
     <div>
         <div className='shadow-lg rounded-2xl ml-[29%] mr-[29%] mt-[1%] backdrop-blur-md'>  <AccountNav/> </div>
        {subpage === 'profile' && (

            <div className="text-center max-w-sm mx-auto mt-2 text-gray font-no  shadow-2xl backdrop-blur-md pb-[1%] rounded-xl" >
                Logged in as {user.name} ({user.email}) <br/>
                <button onClick={logout} className="bg-primary text-center px-4 py-2 mt-4 text-white font-no rounded-md transform transition duration:700 hover:scale-105 hover:bg-three hover:text-primary">Logout</button>
             </div>         )
                }

                {subpage ==='places' &&(
                    <Places/>
                )}
     
     <div className=" flex justify-center item cenyter"> 
     <Card/>
     </div>
     
     </div>
 )

 }



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
         <AccountNav/>
        {subpage === 'profile' && (
            <div className="text-center max-w-sm mx-auto mt-2 text-gray" >
                Logged in as {user.name} ({user.email}) <br/>
                <button onClick={logout} className="bg-gray-400 text-center px-4 py-2 mt-4 text-white rounded-md">Logout</button>
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



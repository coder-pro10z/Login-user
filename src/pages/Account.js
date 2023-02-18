import { useContext,useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import { UserContext } from "../UserContext";
import axios from 'axios';

export default function Account(){
    const [redirect,setRedirect]=useState(null);
    const {ready,user,setUser}=useContext(UserContext);
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


    if(!ready){
        return 'Loading...';
    }
    if (ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }
    
    //to navigate after logging out 
    if(redirect){
        return <Navigate to={redirect}/>
    }
// return(
//     <div> 
//         account page for {user.name}
//     </div>
// )





function linkClasses(type=null){
    let classes='py-2 px-6';
    if (type===subpage || (subpage===undefined && type ==='profile')){
        classes += ' bg-gray-400 text-white rounded-full';
    }
    return classes;
}

 return(
     <div>
         <nav className="w-full flex mt-8 gap-4 mb-8 justify-center" >
             <Link className={linkClasses("profile")} to={"/account"}>My profile</Link>
             <Link className={linkClasses("bookings")} to={"/account/bookings"}>My bookings</Link>
             <Link className={linkClasses("places")} to={"/account/places"}>My accomodations</Link>
         </nav>
        {subpage === 'profile' && (
            <div className="text-center max-w-sm mx-auto mt-2 text-gray" >
                Logged in as {user.name} ({user.email}) <br/>
                <button onClick={logout} className="bg-gray-400 text-center px-4 py-2 mt-4 text-white rounded-md">Logout</button>
             </div>         )
                }
     </div>
 )

 }



import { useContext } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import { UserContext } from "../UserContext";

export default function Account(){
    const {ready,user}=useContext(UserContext);

    let {subpage} = "profile";
    // let {subpage} = useParams();
    // change profiel back to useParams()

    //     if(!ready){
//     return 'Loading...';
// }
// if (ready && !user){
//     return <Navigate to={'/login'}/>
// }
// console.log(subpage);

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
            <Link className={linkClasses("profile")} to={"/account/"}>My profile</Link>
            <Link className={linkClasses("bookings")} to={"/account/bookings"}>My bookings</Link>
            <Link className={linkClasses("places")} to={"/account/places"}>My accomodations</Link>
        </nav>
        {subpage === 'profile' && (
            <div className="text-center max-w-sm mx-auto mt-2 text-gray" >
                Logged in as {user.name} ({user.email}) <br/>
                <button className="primary">Logout</button>
            </div>
        )}
    </div>
)

}



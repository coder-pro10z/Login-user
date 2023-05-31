import {Link, useLocation} from "react-router-dom";

export default function AccountNav(){
    const {pathname} =useLocation();
    
     let subpage=pathname.split('/')?.[2]
      if(subpage === undefined){
        subpage='profile';
      }
    function linkClasses(type=null){
        
        let classes='inline-flex gap-1 pr-[4%] pl-[4%] rounded-full pt-[1.8%] pb-[1.8%] text-sm md:text-base  ';
        if (type===subpage ){
            classes += ' bg-primary text-white shadow-lg hover:scale-110 transform transition duration-500 hover:bg-three hover:text-primary';
        }
        else{
            // classes += 'bg-gray-200';
        }
       
       
        return classes;
    }

  
    return(
      
      <div className="">
<nav className="w-full flex mt-10 gap-9 mb-8 justify-center  " >
             <Link className={linkClasses("profile")} to={"/account"}>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
</svg>
My profile
             </Link>
             <Link className={linkClasses("bookings") } to={"/account/bookings"}>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
</svg>

                My bookings</Link>
             <Link className={linkClasses("places")} to={"/account/places"}>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6  ">
  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
</svg>

                My accomodations</Link>
         </nav>
         </div>

    );
}
import { Link , useParams } from "react-router-dom";

export default function Places(){

    const {action}=useParams();
    

    return(

        <div>
    {action !=='new' &&(
        <div className= "text-center">
        <Link className=" inline-flex gap-1 bg-primary text-white px-4 py-2 rounded-full  " to={'/account/places/new'}>
           
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>



     Add New Place
     </Link>
    </div>
    )}
    
    {/* // to add a new places  */}
    {action === 'new' &&(
        <div>
           <form >
            <h2 className="text-2xl mt-4" >Title</h2>
            <p className="text-gray-500 text-sm">Title for Your Place. should be short and precise for advertisement </p>
               <input className="inline-flex border-2 border-gray-300 rounded-md w-100 min-w-full mt-1 p-1" type="text" placeholder=" Title, For Example: My Lovely Apartment" />
               <h2 className= "text-2xl mt-4">Address</h2>
               <p className="text-gray-500 text-sm">Address to your Place that is going on rent  </p>
               <input type="text" className='inline-flex border-2 border-gray-300 rounded-md w-100 min-w-full mt-1 p-1' placeholder=" Address" />
               <h2 className="text-2xl mt-4">Photos</h2>
               <p className="text-gray-500 text-sm">The more the better </p>
                <div>
                    <input className='inline-flex border-2 border-gray-300 rounded-md w-5/6 max-w-full justify-between mt-1 p-1' placeholder=' Add photos using the link ...jpg '></input>
                    <button className=" mt-4 px-4 py-2 ml-2 rounded-2xl">Add photo</button>
                </div>
               <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

               <button className="border br-transparent rounded-2xl p-8 text-2xl text-gray-600">+</button>
               </div>

           </form>
        </div>
    )}

</div>

    )
}
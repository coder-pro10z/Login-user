import { Link , useParams } from "react-router-dom";

export default function Places(){

    const {action}=useParams();
    

    return(

        <div>
    {action !=='new' &&(
        <div className= "text-center cursor-pointer">
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

               <button className="flex justify-center cursor-pointer gap-1 border br-transparent rounded-2xl px-8 py-12 text-2xl text-gray-600">
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                Upload</button>
               </div>

               <h2 className="text-2xl mt-4" >Description</h2>
            <p className="text-gray-500 text-sm">Description for Your Place. should be short and precise for advertisement </p> 
            <textarea className="border-2 border-gray-300 rounded-md p-8 w-80 mt-2"></textarea>
          
           {/* Perks */}
            <h2 className="text-2xl mt-4" >Perks</h2>
            <p className="text-gray-500 text-sm">Select all the perks of your place </p> 
             <div className="grid  grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
                <label  className="border-2 flex rounded-xl gap-2 p-4 items-center cursor-pointer">
                <input type="checkbox"></input>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </svg>
                <span> Wifi</span>
                </label>
                
                <label className="border-2 flex rounded-xl gap-2 p-4 items-center cursor-pointer">
                <input type="checkbox"></input>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <span>Free parking slot</span>
                </label>

                <label className="border-2 flex rounded-xl gap-2 p-4 items-center cursor-pointer">
                <input type="checkbox"></input>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <span>TV</span>
                </label>
                
                <label className="border-2 flex rounded-xl gap-2 p-4 items-center cursor-pointer">
                <input type="checkbox"></input>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <span> Radio</span>
                </label>

                <label className="border-2 flex rounded-xl gap-2 p-4 items-center cursor-pointer">
                <input type="checkbox"></input>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>

                <span> Private Enterance</span>
                </label>

                <label className="border-2 flex rounded-xl gap-2 p-4 items-center cursor-pointer">
                <input type="checkbox"></input>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
                <span> Pets</span>
                </label>
             </div>
{/* Extra Info  */}
             <h2 className="text-2xl mt-4" >Extra Info</h2>
            <p className="text-gray-500 text-sm">House Rules, etc </p> 
            <textarea className="border-2 border-gray-300 rounded-md w-80 p-8 "/>
            <h2 className="text-2xl mt-4" >Check IN & Out times</h2>
            <p className="text-gray-500 text-sm">Select all the perks of your place </p> 
            
            <div className="mt-2 grid sm:grid-cols-3 items-center text-center ">
                <div >
                    <h3>Check in time</h3>
                    <input className="inline-flex border-2 border-gray-300 rounded-md mt-1 mb-1 p-1" type='text' placeholder="14:00"></input>
                </div>

                <div>
                <h3>Check out time</h3>
                    <input className="inline-flex border-2 border-gray-300 rounded-md mt-1 mb-1 p-1" type='text' placeholder="18:00"></input>
                </div>

                <div>
                <h3>Max no. of Guests</h3>
                    <input className="inline-flex border-2 border-gray-300 rounded-md mt-1 mb-1 p-1" type='text' placeholder="2"></input>
                </div>

            </div>
            
            <div>
                <button className="primary mt-4">Save</button>
            </div>

           </form>
        </div>
    )}

</div>

    )
}
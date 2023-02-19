import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";

export default function Places() {

    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIN, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState('1');

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4" >{text}</h2>
        )
    }


    function inputPara(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }


    function preInput(header, Para) {
        return (
            <>
                {inputHeader(header)}
                {inputPara(Para)}
            </>
        )
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault();

        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        setAddedPhotos(prev => {
            return [...prev, filename];
        });

        setPhotoLink('');

    }

function uploadPhoto(ev){
    const files=ev.target.files;
    const data=new FormData();
   //adding a new photo from device
    for(let i=0;i<files.length;i++){
        data.append('photos',files[i]);
    }

     //sending a req to API 
     axios.post('/upload',data,{
        headers:{'Content-type':'multipart/form-data'}
     }).then(response=> {
        const{data:filenames}=response;
        setAddedPhotos(prev => {
            return [...prev, ...filenames];
        });
    })
}

    return (

        <div>
            {action !== 'new' && (
                <div className="text-center cursor-pointer">
                    <Link className=" inline-flex gap-1 bg-primary text-white px-4 py-2 rounded-full  " to={'/account/places/new'}>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add New Place
                    </Link>
                </div>
            )}

            {/* // to add a new places  */}
            {action === 'new' && (
                <div>
                    <form >
                        {preInput('Title', 'Title for Your Place. should be short and precise for advertisement')}
                        <input className="inline-flex border-2 border-gray-300 rounded-md w-100 min-w-full mt-1 p-1" type="text" value={title}
                            onChange={ev => setTitle(ev.target.value)} placeholder=" Title, For Example: My Lovely Apartment" />

                        {preInput('Address', 'Address to your Place that is going on rent ')}


                        <input type="text" className='inline-flex border-2 border-gray-300 rounded-md w-100 min-w-full mt-1 p-1'
                            value={address}
                            onChange={ev => setAddress(ev.target.value)} placeholder=" Address" />
                        {preInput('Photos', 'The more the better')}


                        <div>
                            <input className='inline-flex border-2 border-gray-300 rounded-md w-5/6 max-w-full justify-between mt-1 p-1' value={photoLink}
                                onChange={ev => setPhotoLink(ev.target.value)} placeholder=' Add photos using the link ...jpg '></input>
                            <button onClick={addPhotoByLink} className=" mt-4 px-4 py-2 ml-2 rounded-2xl">Add photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div className="flex h-32">
                                    {/* {link} */}
                                    <img  className='rounded-2xl w-full object-cover'src={'http://localhost:5000/uploads/' + link} alt=""/> 
                                </div>)
                            )}
                            <label className="flex justify-center cursor-pointer gap-1 border br-transparent rounded-2xl px-8 py-12 text-2xl text-gray-600">
                                    <input type="file" className="hidden" onChange={uploadPhoto} />

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload</label>
                        </div>
                        {preInput('Description', 'Description for Your Place. should be short and precise for advertisement ')}


                        <textarea className="border-2 border-gray-300 rounded-md p-8 w-80 mt-2" value={description}
                            onChange={ev => setDescription(ev.target.value)}></textarea>

                        {/* Perks */}

                        {preInput('Perks', 'Select all the perks of your place')}

                        <div className="grid  grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {/* Extra Info  */}
                        {preInput('Extra Info', 'House Rules, etc')}

                        <textarea className="border-2 border-gray-300 rounded-md w-80 p-8 " value={extraInfo}
                            onChange={ev => setExtraInfo(ev.target.value)} />
                        {preInput('Check IN & Out times ', 'Select all the perks of your place')}


                        <div className="mt-2 grid sm:grid-cols-3 items-center text-center ">
                            <div >
                                <h3>Check in time</h3>
                                <input className="inline-flex border-2 border-gray-300 rounded-md mt-1 mb-1 p-1" type='text' value={checkIN}
                                    onChange={ev => setCheckIn(ev.target.value)}
                                    placeholder="14:00"></input>
                            </div>

                            <div>
                                <h3>Check out time</h3>
                                <input className="inline-flex border-2 border-gray-300 rounded-md mt-1 mb-1 p-1" type='text' value={checkOut}
                                    onChange={ev => setCheckOut(ev.target.value)}
                                    placeholder="18:00"></input>
                            </div>

                            <div>
                                <h3>Max no. of Guests</h3>
                                <input className="inline-flex border-2 border-gray-300 rounded-md mt-1 mb-1 p-1" type='number'
                                    value={maxGuests}
                                    onChange={ev => setMaxGuests(ev.target.value)} placeholder="2"></input>
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